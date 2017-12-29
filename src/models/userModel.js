/**
 * userModel
*/
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    create_Date: { type: Date, default: Date.now() },
    update_Date: { type: Date, default: Date.now() },
});

mongoose.model('User', userSchema);
