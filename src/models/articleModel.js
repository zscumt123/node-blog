const mongoose = require('mongoose');

const { Schema } = mongoose;

const articleSchema = new Schema({
    title: String,
    create_Date: { type: Date, default: Date.now() },
    category_id: Schema.Types.ObjectId,
})
mongoose.model('article', articleSchema);
