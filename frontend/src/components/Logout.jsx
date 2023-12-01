import { useNavigate } from 'react-router-dom';


export default function Logout({setUserToken}){
   
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("token")
        navigate("/")
        setUserToken(false)
       
    }


    return (<>
    <h2>Are you sure you want to logout?</h2>
    <button className='myButton' onClick={handleLogout}>Yes</button>
    </>)
}