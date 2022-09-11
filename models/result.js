const mongoose = require('mongoose');
const Result = mongoose.Schema({
    date: Date,
    mark: Number,
    note: String,
    type: 'Irásbeli' | 'szóbeli'
})
module.exports = Result;