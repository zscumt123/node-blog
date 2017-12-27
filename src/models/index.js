/**
 * model
*/
const mongoose = require('mongoose');

const config = require('../config');

const { model } = mongoose;
mongoose.connect(config.dbUrl, (err) => {
    if (err) {
        console.error('connect db error!');
        process.exit(1);
    }
});

require('./userModel');

exports.userModel = model('User');
