import React from 'react';
import "./NavBar.css"
import { NavLink } from 'react-router-dom';
// import Login from './Login';


function Navbar() {
  return (
    <nav >
      <NavLink className= "navbar" to="/" >Home</NavLink>
      <NavLink className= "navbar" to="/tasklist" >Available Tasks</NavLink>
      <NavLink className= "navbar" to="/userlist" >Users</NavLink>
      <NavLink className= "navbar" to="/assignment" >Assignments</NavLink>
      <NavLink className= "navbar" to="/login" >Login</NavLink>
      

      

    </nav>
  );
};

export default Navbar;