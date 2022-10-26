const Topic = require('../models/topic');


exports.getMany = async (req, res) => {
    const { subject, grade } = req.params;
    const topics = await Topic.find({ subject, grade })
    return res.status(200).json({ status: 'success', topics: topics })
}


exports.add = async (req, res) => {
    const { subject, grade, date, lesson, text } = req.body;
    await Topic.create({
        subject,
        grade,
        date,
        lesson,
        text

    });
    res.status(201).json({
        status: 'success'
    })
}
exports.update = async (req, res) => {
    const topic = req.body;
    await Topic.findByIdAndUpdate(topic._id, {
        subject: topic.subject,
        grade: topic.grade,
        date: topic.date,
        lesson: topic.lesson,
        text: topic.text
    })
    res.status(201).json({
        status: 'success'
    })
}
exports.delete = async (req, res) => {
    const { id } = req.params;
    await Topic.findByIdAndDelete(id);
    res.status(201).json({
        status: 'success'

    })
}