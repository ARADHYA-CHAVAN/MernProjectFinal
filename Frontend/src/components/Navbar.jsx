import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
   <>
  
    <nav
        className="navbar navbar-expand-sm navbar-dark custom-navbar "
        
    >
        <div className="container-fluid">
            <NavLink className="navbar-brand" to="/">📚CoursePro</NavLink>
            <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapsibleNavId"
                aria-controls="collapsibleNavId"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
                <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" aria-current="page"
                            >Home
                            <span className="visually-hidden">(current)</span></NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/add">Add Course</NavLink>
                    </li>
                   
                </ul>
                
            </div>
        </div>
    </nav>
    
   </>
  )
}

export default Navbar

