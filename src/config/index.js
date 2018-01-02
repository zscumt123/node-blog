/**
 * project config
*/
const path = require('path');

const config = {
    port: 5000,
    dbUrl: 'mongodb://127.0.0.1:27017/blog',
    log_dir: path.resolve(__dirname, '../../logs'),
};


module.exports = config;
