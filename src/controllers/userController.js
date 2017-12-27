/**
 * userController
*/
const userLogin = (req, res, next) => {
    console.log(req.body);
    res.send('hello,login');
};

module.exports = {
    userLogin,
};
