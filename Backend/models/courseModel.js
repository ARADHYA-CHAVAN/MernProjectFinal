const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: String,
    instructor: String,
     category: String,
      duration: Number,
      level: String,
    thumbnail: String

}, {
    timestamps: true
})

const courseModel = mongoose.model('courses', courseSchema)

module.exports = courseModel