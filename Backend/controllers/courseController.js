const courseModel = require('../models/courseModel');


exports.addcourse = async (req, res) => {

    const new_course = new courseModel({
        courseName: req.body.courseName,
        instructor: req.body.instructor,
        category: req.body.category,
        duration: req.body.duration,
        level: req.body.level,
        thumbnail: req.file
            ? `/uploads/${req.file.filename}`
            : ""
    });

    const result = await new_course.save();

    res.status(200).json(result);
}

exports.showcourses = async (req, res) => {
    const courses = await courseModel.find()
    if (courses != null) {
        res.status(200).json(courses)
    } else {
        res.status(404).json({ 'message': 'No courses' })
    }
}

exports.showcourse = async (req, res) => {
    const course = await courseModel.findById(req.params.id)
    if (course != null) {
        res.status(200).json(course)
    } else {
        res.status(404).json({ message: ' course not found' })
    }
}

exports.updatecourse = async (req, res) => {
    const data = req.body
    if (req.file) {
        data.thumbnail = `/uploads/${req.file.filename}`  
    }
    const course = await courseModel.findByIdAndUpdate(req.params.id, data)
    res.status(200).json({ message: 'course updated successfully...' })
}

exports.delcourse= async (req, res) => {
    const course = await courseModel.findByIdAndDelete(req.params.id)
    if (course != null) {
        res.status(200).json({ message: 'course deleted successfully...' })
    } else {
        res.status(404).json({ message: 'course not found...' })
    }
}