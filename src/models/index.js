
/**
 * model
*/
const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../common/logger');

mongoose.Promise = Promise;
// const { model } = mongoose;
mongoose.connect(config.dbUrl, { useMongoClient: true }, (err) => {
    if (err) {
        logger.error('connect db error:', err.message);
        process.exit(1);
    }
    logger.trace('connect db success!');
});

require('./userModel');

exports.UserModel = mongoose.model('User');
