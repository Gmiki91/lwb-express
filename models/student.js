const mongoose = require('mongoose');
const GradeBook = require('./gradeBook');
const Student = mongoose.Schema({
    _id:String,
    fullNameC: String,
    fullNameL: String,
    pw:String,
    pgName:String,
    dob: Date,
    currentGrade: Number,
    email: String,
    address:String,
    phone: String,
    ukraineSchool: String,
    healthIssues: [String],
    vegetarian: Boolean,
    homeGoing:Boolean,
    archived: Boolean,
    registeredAt: Number,
    gradeBook: [GradeBook],
    missedClassAt:[Number],
    foodOrderedFor:[Number],
}
    , { collection: 'students' });
    
module.exports = mongoose.model('Student', Student);