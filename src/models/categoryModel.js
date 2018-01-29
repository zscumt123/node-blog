const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;
const getCurrentTime = () => Date.now();

const categorySchema = new Schema({
    category_name: String,
    create_time: { type: Date, default: getCurrentTime },
    article_count: { type: Number, default: 0 },
});

categorySchema.virtual('create_date').get(function () {
    return moment(this.create_time).format('YYYY-MM-DD HH:mm:ss');
});
categorySchema.set('toJSON', { virtuals: true }).set('id', false);

categorySchema.statics.findCategory = function () {
    return this.find({}, { __v: 0 });
}

mongoose.model('Category', categorySchema);
