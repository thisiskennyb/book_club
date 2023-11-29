import { Link, useNavigate } from 'react-router-dom';
import './css/nav_bar.css'
import logo from '../assets/chapter-chat-high-resolution-logo-transparent.png';

export default function Navbar({ userToken, setBookClubSelected}) {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    if (path === '/BookClub'){
      setBookClubSelected(false)
    }
    if (path === '/') {
      navigate('/')
    } else if (!userToken) {
        navigate('/login')
    } else {
      navigate(path);
    }
  };

  return (
    <ul className="navbar">
      <img src={logo} className="logo" id="main-logo"/>
      <li className="nav-item" onClick={() => handleLinkClick('/')}>
        <Link to="/">Home</Link>
      </li>
      {!userToken ?(
        <>
      <li className="nav-item" onClick={() => handleLinkClick('/profile')}>
        <Link to="/profile">Profile</Link>
      </li>
      <li className="nav-item" onClick={() => handleLinkClick('/search')}>
        <Link to="/search">Search</Link>
      </li>
      <li className="nav-item" onClick={() => handleLinkClick('/BookClub')}>
        <Link to="/BookClub">Book Club</Link>
      </li>
        </>
      ):(
        null
      )}
    
      {userToken ? (
        <>
          <li className="nav-item" onClick={() => handleLinkClick('/profile')}>
            <Link to="/profile">Profile</Link>
          </li>
          <li className="nav-item" onClick={() => handleLinkClick('/search')}>
            <Link to="/search">Search</Link>
          </li>
          <li className="nav-item" onClick={() => handleLinkClick('/BookClub')}>
            <Link to="/BookClub">Book Club</Link>
          </li>
          <li className="nav-item" onClick={() => handleLinkClick('/logout')}>
            <Link to="/logout">Logout</Link>
          </li>
        </>
      ) : (
        <>
            <li className="nav-item" onClick={() => handleLinkClick('/login')}>
                <Link to="/login">Login</Link>
            </li>
        </>
      )}
    </ul>
  );
}
