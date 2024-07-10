import React from 'react';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/tasks">Tasks</Link></li>
        <li><Link to="/users">Users</Link></li>
        <li><Link to="/assignments">Assignments</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;