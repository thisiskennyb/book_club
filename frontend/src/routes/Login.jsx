
import { useState } from 'react';
import Form from "../components/Form";
import { signup,login } from '../api/backend_calls';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './css/login.css'


export default function Login({handleInputChange, formData, handleToken}) {
const [responseMsg, setResponseMsg] = useState("")
const navigate = useNavigate();
const handleLogin = async(e) =>{
    const context = {username: formData.username, password: formData.password}
    const token = await login(context)
    if(!token) {
      setResponseMsg("Error logging in")
    } else {
      handleToken(token)
      navigate("/")
    }
}  
// const handleRegister = async(e) =>{
//     const context = {username: formData.username, password: formData.password}
//     const response = await signup(context)
//     setResponseMsg(response.username)
// }  

return (
  <div className="login-container">
    <h2 className="login-title">Login</h2>
    <Form handleInputChange={handleInputChange} formData={formData} />
    <div className="not-registered" id="register">
      Not registered? <Link to="/signup">Click here</Link>
    </div>
    <button className="login-button" onClick={handleLogin}>
      Login
    </button>
  </div>
);
}