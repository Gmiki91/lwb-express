const mongoose = require('mongoose');
const Result = mongoose.Schema({
    date: Date,
    mark: Number,
    note: String,
    textAssesment:String,
    type: 'Irásbeli' | 'szóbeli',
    updatedBy:String,
    deleted:{
        type:Boolean,
        default: false
    }
})
module.exports = Result;