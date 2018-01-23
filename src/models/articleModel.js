const mongoose = require('mongoose');

const { Schema } = mongoose;

const getCurrentTime = () => Date.now();

const articleSchema = new Schema({
    title: String,
    createDate: { type: Date, default: getCurrentTime },
    updateDate: { type: Date, default: getCurrentTime },
    categoryId: Schema.Types.ObjectId,
    introduction: String,
    commentsId: Array,
    pageView: { type: Number, default: 0 },
    article: String,
});
mongoose.model('Article', articleSchema);

