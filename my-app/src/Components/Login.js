// Login.js

import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
       console.log(JSON.stringify({email, password}))
        fetch('https://task-app-server-07x5.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => response.json())
        .then(data => {
            
            console.log('Login successful!', data);
        })
        .catch(error => {
        
            console.error('Login error:', error);
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={e => { e.preventDefault(); handleLogin(); }}>
                <label>Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} />
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
