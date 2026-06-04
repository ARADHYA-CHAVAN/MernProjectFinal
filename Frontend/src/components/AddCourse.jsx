import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddCourse = () => {

    const [course, setCourse] = useState({
        courseName: '', instructor: '', category: '', duration: '', level: 'Beginner'
    })
    const [thumbnail, setThumbnail] = useState(null)
    const [preview, setPreview] = useState(null)
    const [message, setMessage] = useState("");
    const navigate = useNavigate()

    const handleFile = (e) => {
        const file = e.target.files[0]
        setThumbnail(file)
        setPreview(URL.createObjectURL(file))
    }

    const handleSubmit = (e) => {
        e.preventDefault()


        const formData = new FormData()
        formData.append('courseName', course.courseName)
        formData.append('instructor', course.instructor)
        formData.append('category', course.category)
        formData.append('duration', course.duration)
        formData.append('level', course.level)
        if (thumbnail) {
            formData.append('thumbnail', thumbnail)
        }

        axios.post('http://localhost:4000/course/add', formData)
            .then(() => {
                setMessage("✅ Course Added Successfully!")

                setTimeout(() => {
                    navigate("/")
                }, 2050)
            })
            .catch((err) => console.log(err))
    }

    return (
        <>
            <div className="container">
                <div className="row justify-content-center align-items-center g-2">
                    <div className="col">
                        <div className="card mt-4 border-dark">
                            <div className="card-body">
                                <h4 className="card-title text-center">Add Course</h4>
                                {
                                    message && (
                                        <div
                                            className="alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 shadow"
                                            style={{ zIndex: 9999,  maxWidth: "500px",width: "90%" }}
                                        >
                                            {message}
                                        </div>
                                    )
                                }
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control shadow-sm rounded-3 course-card"
                                            id="formId1" placeholder="" required
                                            onChange={(e) => setCourse({ ...course, courseName: e.target.value })} />
                                        <label htmlFor="formId1">CourseName</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control shadow-sm rounded-3 course-card"
                                            id="formId2" placeholder="" required
                                            onChange={(e) => setCourse({ ...course, instructor: e.target.value })} />
                                        <label htmlFor="formId2">Instructor</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control shadow-sm rounded-3 course-card"
                                            id="formId3" placeholder="" required
                                            onChange={(e) => setCourse({ ...course, category: e.target.value })} />
                                        <label htmlFor="formId3">Category</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control shadow-sm rounded-3 course-card"
                                            id="formId4" placeholder="" required min="1"
                                            onChange={(e) => setCourse({ ...course, duration: e.target.value })} />
                                        <label htmlFor="formId4">Duration</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select shadow-sm rounded-3 course-card"
                                            required
                                            onChange={(e) => setCourse({ ...course, level: e.target.value })}>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                        <label>Level</label>
                                    </div>


                                    <div className="mb-3 text-start">
                                        <label className="form-label ms-2" style={{ fontSize: "14px", color: "#6c757d" }}>Thumbnail</label>
                                        <input
                                            type="file"
                                            className="form-control shadow-sm rounded-3 course-card "
                                            accept="image/*"
                                            onChange={handleFile}
                                        />
                                    </div>


                                    {preview && (
                                        <div className="mb-3">
                                            <img src={preview} alt="preview"
                                                className="img-fluid rounded"
                                                style={{ maxHeight: '200px' }} />
                                        </div>
                                    )}

                                    <button type="submit" className="btn btn-outline-dark course-card">
                                        Add Course
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddCourse