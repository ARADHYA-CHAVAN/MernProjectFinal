import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'

const ShowCourse = () => {

    const [course, setCourse] = useState({})
    const [showModal, setShowModal] = useState(false)
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = "CoursePro - Course Details";

        axios.get(`http://localhost:4000/course/${id}`)
            .then((res) => setCourse(res.data))
            .catch((err) => console.log(err))
    }, [])

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:4000/course/${id}`)

            navigate("/", {
                state: {
                    message: "✅ Course Deleted Successfully!"
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div
                className="container"
            >
                <div
                    className="row justify-content-center align-items-center g-2"
                >
                    <div className="col ">
                        <div className="card mt-4 border-0 shadow-sm ">
                            <img
                                className="card-img-fluid rounded mx-auto d-block mt-2"
                                src={course.thumbnail?.startsWith('/uploads')
                                    ? `http://localhost:4000${course.thumbnail}`
                                    : course.thumbnail
                                }
                                alt="Thumbnail"
                                style={{ height: "320px", width: "400px" }}
                                onError={(e) => {
                                    e.target.onerror = null
                                    e.target.style.display = 'none'
                                }}
                            />
                            <div className="card-body">
                                <h4 className="card-title fw-bold text-dark">{course.courseName}</h4>

                                <p className="card-text"><strong>Instructor:</strong> {course.instructor}</p>
                                <p className="card-text"><strong>Category:</strong> {course.category}</p>
                                <p className="card-text"><strong>Duration:</strong> {course.duration} hrs</p>
                                <p className="card-text"><strong>Level:</strong> {course.level}</p>
                                <NavLink
                                    name=""
                                    id=""
                                    className="btn btn-outline-warning me-2 course-card"
                                    to={`/edit/${course._id}`}
                                    role="button"
                                >Edit</NavLink>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger me-2 course-card"
                                    onClick={() => setShowModal(true)}
                                >
                                    Delete
                                </button>
                                <NavLink
                                    name=""
                                    id=""
                                    className="btn btn-outline-dark me-2 course-card"
                                    to="/"
                                    role="button"
                                >Back to Home</NavLink>




                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {
                showModal && (
                    <>
                        <div
                            className="modal fade show"
                            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                        >
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">

                                    <div className="modal-header">
                                        <h5 className="modal-title">
                                            ⚠️ Delete Course
                                        </h5>

                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>

                                    <div className="modal-body">
                                        Are you sure you want to delete this course?
                                        <br />
                                        <strong>This action cannot be undone.</strong>
                                    </div>

                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-outline-secondary"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={handleDelete}
                                        >
                                            Delete
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default ShowCourse
