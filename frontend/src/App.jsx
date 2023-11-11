import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './routes/Home'
import Login from './routes/Login'
import Profile from './routes/Profile'
import Search from './routes/Search'
import NavBar from './components/NavBar'
import Logout from './components/Logout'

function App() {
  const url="http://localhost:8000/api/"
  
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [userToken, setUserToken] = useState(null)
  useEffect( () => {
    const token = localStorage.getItem("token")
    if(token) {
      setUserToken(token)
    }

  }, [])

  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    localStorage.setItem("token", token)
    setUserToken(token)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  return (
<>
    <div className="app-container">
      
    <Router>
      <NavBar />
     <Routes>
      <Route path="/login" element={<Login url={url} handleInputChange={handleInputChange} formData={formData} handleToken={handleToken}/>} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/logout" element={<Logout />} />
     </Routes>
     </Router>
     </div>
    </>
  )
}

export default App
