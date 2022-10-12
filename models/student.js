const mongoose = require('mongoose');
const GradeBook = require('./gradeBook');
const Student = mongoose.Schema({
    _id:String,
    fullNameC: String,
    fullNameL: String,
    dob: Date,
    currentGrade: Number,
    ukraineSchool: String,
    healthIssues: [String],
    vegetarian: Boolean,
    registeredAt: Number,
    notes: Number,
    gradeBook: [GradeBook],
    missedClassAt:[Number],
    foodOrderedFor:[Number],
}
    , { collection: 'students' });
    
module.exports = mongoose.model('Student', Student);