// export default function({userToken}) {

//     return(
//     <ul className="navbar">
//         <li className="nav-item"><a href="/">Home</a></li>
//         {userToken ? 
//         <li className="nav-item"><a href="profile">Profile</a></li>: null}
//         <li className="nav-item"><a href="search">Search</a></li>
//         {/* <li className="nav-item"><a href="about">About</a></li> */}
//         {/* <li className="nav-item"><a href="contact">Contact</a></li> */}
//         <li className="nav-item"><a href="BookClub">Book Club</a></li>
//         <li className="nav-item"><a href="login">Login</a></li>
//         <li className="nav-item"><a href="logout">LogOut</a></li>
        
//     </ul>
//     )
// }

import { Link } from 'react-router-dom';

export default function Navbar({ userToken }) {
    return (
        <ul className="navbar">
            <li className="nav-item"><Link to="/">Home</Link></li>
            {userToken ? <li className="nav-item"><Link to="/profile">Profile</Link></li> : null}
            <li className="nav-item"><Link to="/search">Search</Link></li>
            <li className="nav-item"><Link to="/BookClub">Book Club</Link></li>
            <li className="nav-item"><Link to="/login">Login</Link></li>
            <li className="nav-item"><Link to="/logout">Logout</Link></li>
        </ul>
    );
}