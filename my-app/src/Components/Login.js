// Login.js

import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Here you would typically send a POST request to your Flask backend
        // to authenticate the user with the provided username and password.
        // Example:
        fetch('https://task-app-server-07x5.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            // Handle successful login, e.g., store user data in state or local storage.
            console.log('Login successful!', data);
        })
        .catch(error => {
            // Handle login error, e.g., display error message to the user.
            console.error('Login error:', error);
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                <label>Username:
                    <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </label>
                <br />
                <label>Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
