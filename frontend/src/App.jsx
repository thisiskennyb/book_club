import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './routes/Home'
import Login from './routes/Login'
import Profile from './routes/Profile'
import Search from './routes/Search'
import BookClub from './routes/BookClub'
import NavBar from './components/NavBar'
import Logout from './components/Logout'
import OthersProfile from './routes/OthersProfile'
import TopFive from './routes/TopFive'
import SignUp from './routes/SignUp'
function App() {
  
  const [bookClubSelected, setBookClubSelected] = useState(false)
  const [creatingBookClub, setCreatingBookClub] = useState(false)
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
      <NavBar setCreatingBookClub={setCreatingBookClub} setBookClubSelected={setBookClubSelected} userToken={userToken}/>
     <Routes>
      <Route path="/login" element={<Login handleInputChange={handleInputChange} formData={formData} handleToken={handleToken}/>} />
      <Route path="/" element={<Home userToken={userToken}/>} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/search" element={<Search />} />
      <Route path="/BookClub" element={<BookClub creatingBookClub={creatingBookClub} setCreatingBookClub={setCreatingBookClub} bookClubSelected={bookClubSelected} setBookClubSelected={setBookClubSelected}/>} />
      <Route path="/logout" element={<Logout setUserToken={setUserToken}/>} />
      <Route path="/othersProfile/:userPK" element={<OthersProfile />} />
      <Route path="/testtopfive" element={<TopFive />} />
      <Route path="/signup" element={<SignUp />} />
     </Routes>
     </Router>
     </div>
    </>
  )
}

export default App
