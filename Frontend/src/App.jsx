import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import AddCourse from './components/AddCourse'
import ShowCourse from './components/ShowCourse'
import EditCourse from './components/EditCourse'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import './theme.css';

const App = () => {
  return (
    <>
      <BrowserRouter>
  <Navbar />

  <div className="content-container">
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/add' element={<AddCourse />} />
      <Route path='/edit/:id' element={<EditCourse />} />
      <Route path='/:id' element={<ShowCourse />} />
    </Routes>

    <footer className="text-center mt-4 mb-3 text-secondary">
      © 2026 CoursePro. All Rights Reserved.
    </footer>
  </div>
</BrowserRouter>
    </>
  )
}

export default App
