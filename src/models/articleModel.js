const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const getCurrentTime = () => Date.now();


const articleSchema = new Schema({
    title: String,
    createDate: { type: Date, default: getCurrentTime },
    updateDate: { type: Date, default: getCurrentTime },
    categoryId: Schema.Types.ObjectId,
    categoryName: String,
    introduction: { type: String },
    commentsId: Array,
    pageView: { type: Number, default: 0 },
    article: String,
});
articleSchema.virtual('formatCreateDate').get(function() {
    return moment(this.createDate).format('YYYY-MM-DD HH:mm:ss');
});
articleSchema.virtual('formatUpdateDate').get(function () {
    return moment(this.updateDate).format('YYYY-MM-DD HH:mm:ss');
});
articleSchema.set('toJSON', { virtuals: true }).set('id', false);
mongoose.model('Article', articleSchema);

