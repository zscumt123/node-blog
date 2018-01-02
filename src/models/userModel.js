/**
 * userModel
*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const getTime = () => Date.now();

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    create_Date: { type: Date, default: getTime },
    update_Date: { type: Date, default: getTime },
});

mongoose.model('User', userSchema);
