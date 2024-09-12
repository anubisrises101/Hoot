import { Link } from 'react-router-dom';
import * as authService from '../../services/authService';
import './NavBar.css';

export default function NavBar({ user, setUser }) {
  function handleLogOut() {
    authService.logOut();
    setUser(null);
  }

  return (
    <nav className="NavBar">
      <Link to="/">Home</Link>
      &nbsp; | &nbsp;
      {user ? (
        <>
          <Link to="/hoots">Hoot List</Link>
          &nbsp; | &nbsp;
          <Link to="/hoots/new">New Hoot</Link>
          &nbsp; | &nbsp;
          <Link to="" onClick={handleLogOut}>
            Log Out
          </Link>
          &nbsp;&nbsp;
          <span>Welcome, {user.name}</span>
        </>
      ) : (
        <>
          <Link to="/login">Log In</Link>
          &nbsp; | &nbsp;
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </nav>
  );
}