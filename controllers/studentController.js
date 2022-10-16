const Student = require('../models/student');
const ObjectId = require('mongodb').ObjectId;
exports.register = async (req, res) => {
    const { fullNameC, fullNameL, dob, currentGrade, healthIssues, vegetarian, ukraineSchool, registeredAt, user } = req.body;
    const student = await Student.create({
        _id: new ObjectId(),
        fullNameC: fullNameC,
        fullNameL: fullNameL,
        dob: dob,
        currentGrade: currentGrade,
        healthIssues: healthIssues,
        vegetarian: vegetarian,
        ukraineSchool: ukraineSchool,
        registeredAt: registeredAt,
        gradeBook: initGradeBooks(currentGrade),
        missedClassAt: [],
        foodOrderedFor: [],

    });
    user.childrenIds.push(student._id);
    user.save();
    res.status(200).json({
        status: 'success',
        student
    })
};
exports.getMany = async (req, res) => {
    let classes = req.params.classes.split(',');
    classes = classes.map(grade => +grade);
    const students = await Student.find({ currentGrade: { $in: classes } })
    res.status(200).json({
        status: 'success',
        students
    })
}

exports.getChildren = async (req, res) => {
    const { childrenIds } = req.body.user.toObject();
    const students = await Student.find({ _id: { $in: childrenIds } })
    res.status(200).json({
        status: 'success',
        students
    })
}

exports.updateStudents = async (req, res) => {
    const { students } = req.body;
    const studentPresence = students.map(student => { return { id: student._id, presence: student.missedClassAt } });
    studentPresence.forEach(async el => {
        await Student.updateOne({ _id: el.id }, { missedClassAt: el.presence })
    });
    res.status(200).json({
        status: 'success'
    })
}
exports.getAllFoodOrder = async (req, res) => {
    const students = await Student.find();
    data = students.filter(student => student.foodOrderedFor.length > 0);

    const groups = data.reduce((groups, student) => {
        student.foodOrderedFor.forEach(order => {
            if (order > Date.now()) {
                const date = new Date(order);
                date.setHours(0, 0, 0, 0);
                if (!groups[date]) groups[date] = 0;
                const value = student.vegetarian ? 0.01 : 1;
                groups[date] += value;
            }
        })
        return groups;
    }, {});
    const result = Object.keys(groups).map((date) => {
        return { date, count: groups[date] };
    });
    result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    res.status(200).json({
        status: 'success',
        result
    })

}

exports.updateFoodOrder = async (req, res) => {
    const { student } = req.body;
    await Student.findByIdAndUpdate(student._id, { foodOrderedFor: student.foodOrderedFor })
    res.status(200).json({
        status: 'success'
    })
}

exports.getResults = async (req, res) => {
    let students = await Student.find({ currentGrade: { $in: req.body.grade } });
    students = students
        .map(student => {
            return {
                _id: student._id,
                fullNameC: student.fullNameC,
                results: student.gradeBook.find(book => book.subject === req.body.subject)?.results
            }
        })
    res.status(200).json({
        status: 'success',
        data: students
    })
}

exports.giveResult = async (req, res) => {
    const { studentMarks, result, grade, subject } = req.body;
    const ids = studentMarks.map(studentMark => studentMark.id);
    const students = await Student.find({ _id: { $in: ids } });
    const promises = [];
    students.forEach(student => {
        student.gradeBook
            .find(book => (book.subject === subject && grade == book.grade))
            .results.push(addMarkAndResult(student._id, studentMarks, result))
        promises.push(student.save());
    });
    Promise.all(promises).then(() =>
        res.status(201).json({ status: 'success' })
    );
}

const addMarkAndResult = (id, studentMarks, result) => {
    studentMarks.forEach(studentMark => {
        if (ObjectId(studentMark.id).equals(id)) {
            result.mark = studentMark.mark;
        }
    });
    return result;
}

exports.updateResult = async (req, res) => {
    const { studentId, result, grade, subject } = req.body;
    const student = await Student.findById(studentId);
    student.gradeBook
        .find(book => book.subject === subject && grade == book.grade)
        .results.find(resultObj => ObjectId(result._id).equals(resultObj._id)).set(result)

    await student.save();
    res.status(201).json({
        status: 'success',
    })
}

const initGradeBooks = (grade) => {
    const subjects = getSubjectsByGrade(grade);
    const books = subjects.map(subject => {
        return {
            grade: grade,
            subject: subject,
            results: []
        }
    });
    return books;
}
const getSubjectsByGrade = (grade) => {
    switch (grade) {
        case 1:
        case 2:
            return ["biology", "math"];
        case 3:
        case 4:
            return ["english", "math"];
        case 5:
        case 6:
            return ["history", "literature"];
        case 7:
        case 8:
            return ["english", "math", "biology"];
        case 9:
        case 10:
        case 11:
            return ["chemistry"];
    }
}