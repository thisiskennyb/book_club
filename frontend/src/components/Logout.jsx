import { useNavigate } from 'react-router-dom';
import './css/logout.css'


export default function Logout({setUserToken}){
   
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("token")
        navigate("/")
        setUserToken(false)
       
    }


    return (
    <div className="logout-container">
    <h2>Are you sure you want to logout?</h2>
    <button className="logout-button" onClick={handleLogout}>Yes</button>
    </div>
    )
}