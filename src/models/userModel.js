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
    isAdmin: { type: Boolean, default: false },
});
userSchema.virtual('create_time').get(function () {
    return moment(this.create_Date).format('YYYY-MM-DD HH:mm:ss');
});
userSchema.path('password').set((val) => {
    const md5 = crypto.createHash('md5');
    const cryptoPwd = md5.update(val).digest('hex');
    return cryptoPwd;
});
// userSchema.path('create_Date').get(time => moment(time).format('YYYY-MM-DD HH:mm:ss'));
// userSchema.path('update_Date').get(time => moment(time).format('YYYY-MM-DD HH:mm:ss'));
// userSchema.set('toJSON', { getters: true, virtuals: false });
// userSchema.set('toJSON', { virtuals: true });
mongoose.model('User', userSchema);
