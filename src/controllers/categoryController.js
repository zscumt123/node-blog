const validator = require('validator');
const { CategoryModel, ArticleModel } = require('../models');
const { formatNormalResponse, formatWarnResponse } = require('../common/utils');

const getCategoryList = async function (req, res, next) {
    try {
        // const doc = await CategoryModel.find({});
        const doc = await CategoryModel.findCategory();
        res.send(formatNormalResponse(doc));
    } catch (e) {
        return next(e);
    }
};
const addCategoryList = async function (req, res, next) {
    const { name } = req.body;
    try {
        const doc = await CategoryModel.findOne({ category_name: name });
        if (doc) {
            res.send(formatWarnResponse('该分类已经存在'));
        } else {
            const categoryDoc = new CategoryModel({ category_name: name });
            await categoryDoc.save();
            res.send(formatNormalResponse('添加成功'));
        }
    } catch (e) {
        return next(e);
    }
};
const updateCategoryList = async function (req, res, next) {
    const { _id: id = '', name = '' } = req.body;
    if (!id || !validator.isMongoId(id) || !name) {
        res.send(formatWarnResponse('参数错误'));
        return;
    }
    try {
        const doc = await CategoryModel.findById(id);
        if (!doc) {
            res.send(formatWarnResponse('无效的分类'));
        } else {
            await CategoryModel.findByIdAndUpdate(id, { category_name: name });
            await ArticleModel.update({ categoryId: id }, { categoryName: name }, { multi: true });
            res.send(formatNormalResponse('修改成功'));
        }
    } catch (e) {
        return next(e);
    }
};
const deleteCategoryList = async function (req, res, next) {
    const { id = '' } = req.params;
    if (!validator.isMongoId(id)) {
        res.send(formatWarnResponse('参数无效'));
        return;
    }
    try {
        // 判断该分类下是否有文章存在
        const hasArticle = await ArticleModel.findOne({ categoryId: id });
        if (hasArticle) {
            res.send(formatWarnResponse('该分类下存在文章，无法删除'));
            return;
        }
        const doc = await CategoryModel.findByIdAndRemove(id);
        if (doc) {
            res.send(formatNormalResponse('删除成功'));
        } else {
            res.send(formatWarnResponse('无效的分类'));
        }
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    getCategoryList,
    addCategoryList,
    updateCategoryList,
    deleteCategoryList,
};
