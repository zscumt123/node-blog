/**
 * userModel
*/
const moment = require('moment');
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
// userSchema.virtual('create_time').get(function () {
//     return moment(this.create_Date).format('YYYY-MM-DD HH:mm:ss');
// });
userSchema.path('create_Date').get(time => moment(time).format('YYYY-MM-DD HH:mm:ss'));
userSchema.path('update_Date').get(time => moment(time).format('YYYY-MM-DD HH:mm:ss'));
userSchema.set('toJSON', { getters: true, virtuals: false });
mongoose.model('User', userSchema);
