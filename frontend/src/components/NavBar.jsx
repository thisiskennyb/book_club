
// import { Link } from 'react-router-dom';

// export default function Navbar({ userToken }) {
//     return (
//         <ul className="navbar">
//             <li className="nav-item"><Link to="/">Home</Link></li>
//             {userToken ? <li className="nav-item"><Link to="/profile">Profile</Link></li> : null}
//             <li className="nav-item"><Link to="/search">Search</Link></li>
//             <li className="nav-item"><Link to="/BookClub">Book Club</Link></li>

//             {!userToken ?<li className="nav-item"><Link to="/login">Login</Link></li>:
//             <li className="nav-item"><Link to="/logout">Logout</Link></li>}
//         </ul>
//     );
// }

import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ userToken }) {
  const navigate = useNavigate();

  const handleLinkClick = (path) => {
    
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
