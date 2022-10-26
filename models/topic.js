const mongoose = require('mongoose');
const Topic = mongoose.Schema({
    date: Number,
    lesson: Number,
    text: String,
    grade: Number,
    subject: String,
}, { collection: 'topics' });

module.exports = mongoose.model('Topic', Topic);