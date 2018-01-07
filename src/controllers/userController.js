/**
 * userController
*/
const crypto = require('crypto');
const validator = require('validator');
const { UserModel } = require('../models');
const { formatWarnResponse, formatNormalResponse } = require('../common/utils');

const info = ['用户名', '密码', '重复密码', '邮箱'];

const userRegister = async function (req, res, next) {
    const { username = '', pwd = '', rePwd = '', email = '' } = req.body;
    const val = [username, pwd, rePwd, email].findIndex(item => item === '');
    if (val !== -1) {
        const msg = `${info[val]}不能为空`;
        res.send(formatWarnResponse(msg));
        return;
    }
    if (username.length < 6) {
        res.send(formatWarnResponse('用户名必须大于6个字符'));
        return;
    }
    if (!validator.isEmail(email)) {
        res.send(formatWarnResponse('邮箱格式不正确'));
        return;
    }
    if (pwd !== rePwd) {
        res.send(formatWarnResponse('两次输入的密码不一致'));
        return;
    }
    try {
        const doc = await UserModel.findOne({ name: username });
        if (doc) {
            res.send(formatWarnResponse('用户名已存在'));
        } else {
            const userDoc = new UserModel({
                name: username,
                password: pwd,
                email,
            });
            await userDoc.save();
            res.send(formatNormalResponse('注册成功'));
        }
    } catch (e) {
        return next(e);
    }
};

const userLogin = async function (req, res, next) {
    const { username = '', password = '' } = req.body;
    if (username === '' || password === '') {
        res.send(formatWarnResponse('用户名或密码不能为空'));
        return;
    }

    try {
        const md5 = crypto.createHash('md5');
        const cryptoPwd = md5.update(password).digest('hex');
        const doc = await UserModel.findOne({ name: username, password: cryptoPwd });
        if (!doc) {
            res.send(formatWarnResponse('用户名或密码不正确'));
        } else {
            req.session.regenerate(async (err) => {
                if (err) {
                    res.send(formatWarnResponse('登录失败'));
                    return;
                }
                await UserModel.update({ name: username }, { last_time: Date.now() });
                req.session.loginUser = doc.name;
                res.cookie('userName', doc.name);
                res.send(formatNormalResponse({ _id: doc._id, name: doc.name }));
            });
        }
    } catch (e) {
        return next(e);
    }
};

const userList = async function (req, res, next) {
    const { pageSize = 10, pageNum = 1 } = req.query;
    try {
        const count = UserModel.count();
        // const findResult = UserModel.find({}, 'name email update_time create_time last_login_time isAdmin').skip(+pageNum - 1).limit(+pageSize);
        const findResult = UserModel.find({}, {_v:0}).skip(+pageNum - 1).limit(+pageSize);
        const [total, data] = await Promise.all([count, findResult]);
        console.log(data);
        res.send(formatNormalResponse({ data, pageSize: +pageSize, pageNum: +pageNum, total }));
    } catch (e) {
        return next(e);
    }
};

module.exports = {
    userRegister,
    userLogin,
    userList,
};
