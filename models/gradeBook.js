const mongoose = require('mongoose');
const Result = require('./result');
const GradeBook = mongoose.Schema({
    grade: Number,
    subject: String,
    results: [Result]
},{_id:false})
module.exports = GradeBook;

