/**
 * utils
*/
exports.formatWarnResponse = msg => ({
    code: 1,
    msg,
});
exports.formatNormalResponse = data => ({
    code: 0,
    data,
});
exports.formatErrorResponse = () => ({
    code: -1,
    msg: '系统错误',
});
exports.formatSessionResponse = () => ({
    code: 2,
    msg: 'session过期！请重新登录',
});
