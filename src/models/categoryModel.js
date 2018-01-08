const mongoose = require('mongoose');

const { Schema } = mongoose;
const getCurrentTime = () => Date.now();

const categorySchema = new Schema({
    category_name: String,
    create_time: { type: Date, default: getCurrentTime },
});

mongoose.model('Category', categorySchema);
