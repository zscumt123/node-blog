/**
 * userModel
*/
const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const userSchema = new Schema({
    name: String,
    password: String,
    email: String,
    create_Date: { type: Date, default: Date.now() },
    update_Date: { type: Date, default: Date.now() },
});
// userSchema.methods.findUser = function(cb) {
//     return this.
// }

model('User', userSchema);
