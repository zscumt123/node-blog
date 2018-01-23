
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
require('./categoryModel');
require('./articleModel');

exports.UserModel = mongoose.model('User');
exports.CategoryModel = mongoose.model('Category');
exports.ArticleModel = mongoose.model('Article');
