/**
 * @author zs
 * @date 2018/1/24
 * @description articleController
*/
const validator = require('validator');
const { formatNormalResponse, formatWarnResponse } = require('../common/utils');
const { ArticleModel } = require('../models');

const addArticle = async function (req, res, next) {
    const { title = '', categoryId = '', introduction = '', article = '' } = req.body;
    const isNoEmpty = [title, categoryId, introduction, article].every(item => item !== '');
    if (!isNoEmpty) {
        res.send(formatWarnResponse('参数不能为空'));
        return;
    }
    if (!validator.isMongoId(categoryId)) {
        res.send(formatWarnResponse('categoryId格式错误'));
        return;
    }
    const doc = new ArticleModel({ title, categoryId, introduction, article });
    try {
        await doc.save();
        res.send(formatNormalResponse('添加成功'));
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    addArticle,
};
