const express = require('express');
const { addcourse, showcourses, updatecourse, showcourse, delcourse } = require('../controllers/courseController');
const upload = require('../uploadC/upload');

const routes = express.Router()

routes.post('/add', upload.single('thumbnail'), addcourse)
routes.get('/', showcourses)
routes.put('/:id', upload.single('thumbnail'), updatecourse)
routes.get('/:id', showcourse)
routes.delete('/:id', delcourse)

module.exports = routes