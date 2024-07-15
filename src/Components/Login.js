import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import './Login.css'; 

const LoginForm = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isAuthenticated, setLocalIsAuthenticated] = useState(false);
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            const user = JSON.parse(savedUser);
            setIsAuthenticated(true);
            setLocalIsAuthenticated(true);
            setUserName(user.name);
        } else {
            fetch('https://task-app-server-07x5.onrender.com/check_session')
                .then(response => response.json())
                .then(data => {
                    if (data.id) {
                        setIsAuthenticated(true);
                        setLocalIsAuthenticated(true);
                        setUserName(data.name);
                        localStorage.setItem('user', JSON.stringify(data));
                    }
                })
                .catch(error => console.error('Error:', error));
        }
    }, [setIsAuthenticated]);

    const handleLogin = (e) => {
        e.preventDefault();

        fetch('https://task-app-server-07x5.onrender.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.id) {
                setIsAuthenticated(true);
                setLocalIsAuthenticated(true);
                setUserName(data.name);
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/');
            } else {
                setError(data.error || 'Login failed');
            }
        })
        .catch((error) => {
            setError('An error occurred. Please try again.');
        });
    };

    const handleLogout = () => {
        fetch('https://task-app-server-07x5.onrender.com/logout', {
            method: 'DELETE'
        })
        .then(() => {
            setIsAuthenticated(false);
            setLocalIsAuthenticated(false);
            setUserName('');
            localStorage.removeItem('user');
            navigate('/');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <Navbar />
            {isAuthenticated ? (
                <div>
                    <h2>Welcome, {userName}</h2>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit">Login</button>
                    {error && <p>{error}</p>}
                </form>
            )}
        </div>
    );
};

export default LoginForm;
