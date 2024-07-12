import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';

function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    function fetchUsers() {
      fetch('https://task-app-server-07x5.onrender.com/users')
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch users');
          }
          return response.json();
        })
        .then(data => {
          setUsers(data);
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    }

    fetchUsers();
  }, []);

  function handleAddUser (event) {
    event.preventDefault();
    const newUser = { name, email };

    fetch('https://task-app-server-07x5.onrender.com/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to add user');
        }
        return response.json();
      })
      .then(addedUser => {
        setUsers([...users, addedUser]);
        setName('');
        setEmail('');
        window.location.reload();
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

function handleDeleteUser (userId) {
    fetch(`https://task-app-server-07x5.onrender.com/users/${userId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to delete user');
        }
        setUsers(users.filter(user => user.id !== userId));
      })
      .catch(error => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div className='userlist-container' >
      <Navbar/>
      <h2>User List</h2>
      <ul className="ul-list">
        {users.map(user => (
          <li className='row' key={user.id}>
          {user.name} <br></br> {user.email} 
          <br></br>
          <button class="ui button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
        
      </ul>
      <h3>Add New User</h3>
      <form className='adduser-form' onSubmit={handleAddUser}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}required/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <br></br>
        <button class="ui button" type="submit">Add User</button>
        
        
      </form>
     
    </div>
  );
}

export default UserList;