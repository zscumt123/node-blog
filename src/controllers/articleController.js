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
        const doc = new ArticleModel({ title, categoryId, article, introduction });
        await doc.save();
        await CategoryModel.findOneAndUpdate({ _id: categoryId }, { $inc: { article_count: 1 } });
        res.send(formatNormalResponse('添加成功'));
    } catch (e) {
        return next(e);
    }
};
const getArticle = async function (req, res, next) {

}

module.exports = {
    addArticle,
};
