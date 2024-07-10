import React, { useState, useEffect } from 'react';

function UserList() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    function fetchUsers() {
      fetch('http://127.0.0.1:5555/users')
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

    fetch('http://127.0.0.1:5555/users', {
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
      })
      .catch(error => {
        console.error('Error adding user:', error);
      });
  };

function handleDeleteUser (userId) {
    fetch(`http://127.0.0.1:5555/users/${userId}`, {
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
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}<button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h3>Add New User</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)}required/>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default UserList;