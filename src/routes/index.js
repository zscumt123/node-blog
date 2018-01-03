/**
 * api routes
 */
const express = require('express');
const { userLogin, userRegister, userList } = require('../controllers/userController');

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/userlist', userList);
module.exports = router;
