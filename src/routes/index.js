/**
 * api routes
 */
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.userRegister);

module.exports = router;
