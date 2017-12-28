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
