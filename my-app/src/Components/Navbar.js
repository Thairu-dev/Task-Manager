import React from 'react';
import "./NavBar.css"
import { NavLink } from 'react-router-dom';



function Navbar() {
  return (
    <nav >
      <NavLink className= "navbar" to="/" >Home</NavLink>
      <NavLink className= "navbar" to="/tasklist" >Available Tasks</NavLink>
      <NavLink className= "navbar" to="/userlist" >Users</NavLink>
      <NavLink className= "navbar" to="/assignment" >Assignments</NavLink>
      

    </nav>
  );
};

export default Navbar;