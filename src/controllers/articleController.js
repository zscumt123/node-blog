/**
 * @author zs
 * @date 2018/1/24
 * @description articleController
*/
const validator = require('validator');
const { formatNormalResponse, formatWarnResponse } = require('../common/utils');
const { ArticleModel, CategoryModel } = require('../models');

const addArticle = async function (req, res, next) {
    const { title = '', categoryId = '', article = '' } = req.body;
    const isNoEmpty = [title, categoryId, article].every(item => item !== '');
    if (!isNoEmpty) {
        res.send(formatWarnResponse('参数不能为空'));
        return;
    }
    if (!validator.isMongoId(categoryId)) {
        res.send(formatWarnResponse('categoryId格式错误'));
        return;
    }
    try {
        const isIn = await ArticleModel.findOne({ title });
        // todo 截取文章前段作为简介？
        const introduction = article.substr(0, 130).replace(/<\/?[^>]*>/g, '');
        if (isIn) {
            res.send(formatWarnResponse('该文章已经存在'));
            return;
        }
        const { category_name: categoryName = '' } = await CategoryModel.findOneAndUpdate({ _id: categoryId }, { $inc: { article_count: 1 } });
        const doc = new ArticleModel({ title, categoryId, article, introduction, categoryName });
        await doc.save();
        res.send(formatNormalResponse('添加成功'));
    } catch (e) {
        return next(e);
    }
};
const getArticle = async function (req, res, next) {
    const { pageSize = '10', pageNum = '1', startTime = '', endTime = '', categoryId = '' } = req.query;
    if (!(validator.isNumeric(pageSize) && validator.isNumeric(pageNum))) {
        res.send(formatWarnResponse('分页参数不能为空'));
    }

    // todo 如何处理查询参数
    let params = {};
    if (startTime) {
        params = {
            createDate: { $gte: startTime },
        };
    }
    if (endTime) {
        if (params.createDate) {
            params.createDate.$lte = endTime;
        } else {
            params = {
                createDate: { $lte: endTime },
            };
        }
    }
    if (categoryId) {
        params.categoryId = categoryId;
    }
    try {
        const count = await ArticleModel.find(params).count();
        const result = await ArticleModel
            .find(params, { introduction: 0, __v: 0, commentsId: 0, article: 0 })
            .sort({ createDate: -1 })
            .skip((+pageNum - 1) * Number(pageSize))
            .limit(+pageSize);
        const [total, data] = await Promise.all([count, result]);
        res.send(formatNormalResponse({ data, pageSize: +pageSize, pageNum: +pageNum, total }));
    } catch (e) {
        return next(e);
    }
};
const deleteArticle = async function (req, res, next) {
    const { id = '' } = req.params;
    console.log(id);
    if (!validator.isMongoId(id)) {
        res.send(formatWarnResponse('参数无效'));
        return;
    }
    try {
        const doc = await ArticleModel.findByIdAndRemove(id);
        if (!doc) {
            res.send(formatWarnResponse('此文章不存在'));
            return;
        }
        res.send(formatNormalResponse('删除成功'));
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    addArticle,
    getArticle,
    deleteArticle,
};
