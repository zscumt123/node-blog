/**
 * userModel
*/
const moment = require('moment');
const mongoose = require('mongoose');
const crypto = require('crypto');

const { Schema } = mongoose;

const getTime = () => Date.now();

const userSchema = new Schema({
    name: { type: String, required: true },
    password: String,
    email: String,
    create_Date: { type: Date, default: getTime },
    update_Date: { type: Date, default: getTime },
    last_time: { type: Date, default: getTime },
    isAdmin: { type: Boolean, default: false },
});
userSchema.set('id', false);
// userSchema.set('toJSON', { virtuals: true });
userSchema.set('toJSON', { getters: true });

// userSchema.virtual('create_time').get(function () {
//     return moment(this.create_Date).format('YYYY-MM-DD HH:mm:ss');
// });
// userSchema.virtual('update_time').get(function () {
//     return moment(this.create_Date).format('YYYY-MM-DD HH:mm:ss');
// });
// userSchema.virtual('last_login_time').get(function () {
//     return moment(this.last_time).format('YYYY-MM-DD HH:mm:ss');
// });
userSchema.path('password').set((val) => {
    const md5 = crypto.createHash('md5');
    return md5.update(val).digest('hex');
});
userSchema.path('create_Date').get(val => moment(val).format('YYYY-MM-DD HH:mm:ss'));
userSchema.path('update_Date').get(val => moment(val).format('YYYY-MM-DD HH:mm:ss'));
userSchema.path('last_time').get(val => moment(val).format('YYYY-MM-DD HH:mm:ss'));
mongoose.model('User', userSchema);
