import { useNavigate } from 'react-router-dom';

export default function Logout(){
    const navigate = useNavigate();

    const handleLogout = () =>{
        localStorage.removeItem("token")
        navigate("/")
    }


    return (<>
    <h2>Are you sure you want to logout?</h2>
    <button onClick={handleLogout}>Yes</button>
    </>)
}