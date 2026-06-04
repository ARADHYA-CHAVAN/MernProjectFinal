import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const Home = () => {

    const [courses, setCourses] = useState([])
    const [search, setSearch] = useState("")
    const location = useLocation()
    const [message, setMessage] = useState(location.state?.message || "")

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("")
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [message])

    useEffect(() => {
        document.title = "CoursePro - Home";

        axios.get('http://localhost:4000/course')
            .then((res) => setCourses(res.data))
            .catch((err) => console.log(err))

    }, [])


    const filteredCourses = courses.filter((course) =>

        course.courseName?.toLowerCase().includes(search.toLowerCase()) ||

        course.instructor?.toLowerCase().includes(search.toLowerCase()) ||

        course.category?.toLowerCase().includes(search.toLowerCase()) ||

        course.level?.toLowerCase().includes(search.toLowerCase())

    )

    return (
        <>

            <div className="d-flex mt-2 mx-3 mb-3 search-box ">
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
                <input
                    type="text"
                    className="form-control me-2 course-card"
                    placeholder="🔍 Search by Course, Instructor, Category, Level..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        border: "2px solid #d3d3d3",
                        borderRadius: "12px",
                        padding: "12px"
                    }}
                />

                <button
                    className="btn btn-outline-secondary course-card"
                    onClick={() => setSearch("")}
                >
                    Clear
                </button>

            </div>
            <h6 className="text-dark">
                📝 Showing {filteredCourses.length} of {courses.length} courses
            </h6>

            <div
                className="container-fluid"
            >
                <div
                    className="row justify-content-center align-items-center g-5"
                >
                    {
                        filteredCourses.map((course) => (
                            <div className="col-md-6 d-flex " key={course._id}>
                                <div className="card course-card w-100 h-100 " style={{ height: "650px" }}>
                                    <img
                                        className="card-img-fluid rounded mx-auto d-block mt-4 "
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
                                    <div className="card-body d-flex flex-column justify-content-between">
                                        <h4 className="card-title fw-bold text-dark">{course.courseName}</h4>
                                        <p className="card-text"><strong>Instructor:</strong> {course.instructor}</p>
                                        <p className="card-text"><strong>Category:</strong>{course.category}</p>
                                        <p className="card-text"><strong>Duration:</strong> {course.duration} hrs</p>
                                        <p className="card-text"><strong>Level:</strong> {course.level}</p>
                                        <NavLink
                                            name=""
                                            id=""
                                            className="btn btn-outline-dark align-self-center px-4 course-card "
                                            to={`/${course._id}`}
                                            role="button"

                                        >Read More</NavLink>

                                    </div>
                                </div>

                            </div>
                        ))
                    }
                    {
                        filteredCourses.length === 0 && (<h3 className="text-center text-danger">No Courses Found 🔍</h3>)
                    }
                </div> 

            </div>

        </>
    )
}

export default Home
