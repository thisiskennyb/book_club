import './css/signUp.css'
import bookshelf from '../assets/book_shelf.jpg';

export default function SignUp() {
    return (
        <div className="signup-container">
        <img src={bookshelf} alt="Background" className="background-image" />
        <form className="signup-form">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" required />
  
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" required />
  
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
  
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" required />
  
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
  
          <input type="submit" value="Register" className="submit" />
        </form>
      </div>
    );
  }
  