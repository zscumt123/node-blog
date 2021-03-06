/**
 * api routes
 */
const express = require('express');
const { userLogin, userRegister, userList } = require('../controllers/userController');
const { getCategoryList, addCategoryList, updateCategoryList, deleteCategoryList } = require('../controllers/categoryController');
const { addArticle, getArticle, deleteArticle } = require('../controllers/articleController');


const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/userlist', userList);

router.route('/category/:id?')
    .get(getCategoryList)
    .post(addCategoryList)
    .put(updateCategoryList)
    .delete(deleteCategoryList);
router.route('/article/:id?')
    .post(addArticle)
    .get(getArticle)
    .delete(deleteArticle);
// 分类

module.exports = router;
