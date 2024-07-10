import React from 'react';
import "./NavBar.css"
import { NavLink } from 'react-router-dom';



function Navbar() {
  return (
    <nav >
      <NavLink className= "navbar" to="/" >Home</NavLink>
      <NavLink className= "navbar" to="/tasklist" >Tasks</NavLink>
      <NavLink className= "navbar" to="/userlist" >Users</NavLink>
      <NavLink className= "navbar" to="/assignments" >Assignments</NavLink>
      {/* <ul>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/assignments">Assignments</Link></li>
      </ul> */}
    </nav>
  );
};

export default Navbar;