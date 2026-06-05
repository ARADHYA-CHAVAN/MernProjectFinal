import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditCourse = () => {

    const [course, setCourse] = useState({
        courseName: "", instructor: "", category: "", duration: "", level: "", thumbnail: ""
    })
    const [thumbnail, setThumbnail] = useState(null)
    const [preview, setPreview] = useState(null)
    const [message, setMessage] = useState("");
    const { id } = useParams()
    const navigate = useNavigate()



    useEffect(() => {
        axios.get(`http://localhost:4000/course/${id}`)
            .then((res) => {
                setCourse(res.data)
                
                if (res.data.thumbnail) {
                    setPreview(res.data.thumbnail.startsWith('/uploads')
                        ? `http://localhost:4000${res.data.thumbnail}`
                        : res.data.thumbnail
                    )
                }
            })
            .catch((err) => console.log(err))
    }, [])


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
        axios.put(`http://localhost:4000/course/${id}`, formData)
            .then(() => {
                setMessage("✅ Course Updated Successfully!")

                setTimeout(() => {
                    navigate(`/${id}`)
                }, 2000)
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
                                <h4 className="card-title">Edit Course</h4>
                                {
                                    message && (
                                        <div
                                            className="alert alert-success position-fixed top-0 start-50 translate-middle-x mt-3 shadow"
                                            style={{ zIndex: 9999, maxWidth: "500px", width: "90%" }}
                                        >
                                            {message}
                                        </div>
                                    )
                                }
                                <form onSubmit={handleSubmit}>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control shadow-sm rounded-3 course-card"
                                            id="formId1" placeholder="" required
                                            value={course.courseName}
                                            onChange={(e) => setCourse({ ...course, courseName: e.target.value })} />
                                        <label htmlFor="formId1">CourseName</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control shadow-sm rounded-3 course-card"
                                            id="formId2" placeholder="" required
                                            value={course.instructor}
                                            onChange={(e) => setCourse({ ...course, instructor: e.target.value })} />
                                        <label htmlFor="formId2">Instructor</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control shadow-sm rounded-3 course-card"
                                            id="formId3" placeholder="" required
                                            value={course.category}
                                            onChange={(e) => setCourse({ ...course, category: e.target.value })} />
                                        <label htmlFor="formId3">Category</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="number" className="form-control shadow-sm rounded-3 course-card"
                                            id="formId4" placeholder="" min="1" required
                                            value={course.duration}
                                            onChange={(e) => setCourse({ ...course, duration: e.target.value })} />
                                        <label htmlFor="formId4">Duration</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <select className="form-select shadow-sm rounded-3 course-card"
                                            value={course.level || ""}
                                            onChange={(e) => setCourse({ ...course, level: e.target.value })}
                                            style={{ color: "#6c757d" }}>
                                            <option value="Beginner">Beginner</option>
                                            <option value="Intermediate">Intermediate</option>
                                            <option value="Advanced">Advanced</option>
                                        </select>
                                        <label>Level</label>
                                    </div>
                                    <div className="mb-3 text-start">
                                        <label className="form-label ms-1" style={{ fontSize: "12px", color: "#6c757d" }}>Thumbnail</label>
                                        <input type="file" className="form-control shadow-sm rounded-3 course-card"
                                            accept="image/*" onChange={handleFile} />
                                    </div>
                                    {preview && (
                                        <div className="mb-3">
                                            <img src={preview} alt="preview"
                                                className="img-fluid rounded shadow-sm"
                                                style={{ maxHeight: '200px' }} />
                                        </div>
                                    )}
                                    <button type="submit" className="btn btn-warning course-card">
                                        EditCourse
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

export default EditCourse