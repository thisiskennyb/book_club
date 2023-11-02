import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './routes/Home'
import Login from './routes/Login'
import Profile from './routes/Profile'
import Search from './routes/Search'
import NavBar from './components/NavBar'

function App() {


  return (
<>
    <div className="app-container">
      
    <Router>
      <NavBar />
     <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
     </Routes>
     </Router>
     </div>
    </>
  )
}

export default App
