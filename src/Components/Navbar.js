import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./NavBar.css";

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    fetch('https://task-app-server-07x5.onrender.com/logout', {
      method: 'DELETE'
    })
    .then(() => {
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      navigate('/login');
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <nav>
      <NavLink className="navbar" to="/">Home</NavLink>
      <NavLink className="navbar" to="/tasklist">Available Tasks</NavLink>
      <NavLink className="navbar" to="/userlist">Users</NavLink>
      <NavLink className="navbar" to="/assignment">Assignments</NavLink>
      {isAuthenticated ? (
        <button onClick={handleLogout} className="navbar">Logout</button>
      ) : (
        <NavLink className="navbar" to="/login">Login</NavLink>
      )}
    </nav>
  );
}

export default Navbar;
