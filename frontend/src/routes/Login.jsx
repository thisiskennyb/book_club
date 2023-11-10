
import { useState } from 'react';
import Form from "../components/Form";
import { signup,login } from '../api/backend_calls';
import { useNavigate } from 'react-router-dom';


export default function Login({handleInputChange, url, formData, handleToken}) {
const [responseMsg, setResponseMsg] = useState("")
const navigate = useNavigate();
const handleLogin = async(e) =>{
    const context = {username: formData.username, password: formData.password}
    const token = await login(context, url)
    if(!token) {
      setResponseMsg("Error logging in")
    } else {
      handleToken(token)
      navigate("/")
    }
}  
const handleRegister = async(e) =>{
    const context = {username: formData.username, password: formData.password}
    const response = await signup(context, url)
    setResponseMsg(response.username)
}  

    return(<>
        <div>This is login</div>
        <Form handleInputChange={handleInputChange} formData={formData}   />
        <button onClick={handleLogin} >Login</button>
        <button onClick={handleRegister}>Register</button>
    </>
    )
}