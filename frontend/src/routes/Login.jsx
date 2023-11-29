
import { useState } from 'react';
import Form from "../components/Form";
import { signup,login } from '../api/backend_calls';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


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
const handleRegister = async(e) =>{
    const context = {username: formData.username, password: formData.password}
    const response = await signup(context)
    setResponseMsg(response.username)
}  

    return(<>
        <div>This is login</div>
        <Form handleInputChange={handleInputChange} formData={formData}   />
        <div>Not registered? <Link to={'/signup'}><a>click here</a></Link></div>
        <button onClick={handleLogin} >Login</button>
        <button onClick={handleRegister}>Register</button>
    </>
    )
}