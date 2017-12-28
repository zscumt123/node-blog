
/**
 * logger
*/
const path = require('path');
const log4js = require('log4js');
const config = require('../config');

log4js.configure({
    appenders: { cheese: { type: 'file', filename: path.join(config.log_dir, 'cheese.log') } },
    categories: { default: { appenders: ['cheese'], level: 'trace' } },
});

const logger = log4js.getLogger('cheese');

module.exports = logger;
