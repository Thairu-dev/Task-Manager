import React from 'react'
import Navbar from './Navbar'
import "./Home.css"
// import { Link } from 'react-router-dom'
// import React from 'react';
// import Navbar from './Navbar';

const Home = () => {
    return (
        <div style={{ fontFamily: 'Arial, sans-serif', color: '#333' }}>
            <Navbar />
            <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Task Managment App</h1>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                <img 
                    src={"./images/3894977.jpg"} 
                    style={{ 
                        width: '30%', 
                        height: 'auto', 
                        borderRadius: '12px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        marginRight: '20px' 
                    }} 
                    alt={"home-img"} 
                />
                <div>
                    <h2 style={{ textAlign: 'left', padding: '0 20px', fontSize: '1.5em' }}>
                        We help you manage tasks by letting you add users, add new tasks, and assign the tasks to your users.
                    </h2>
                </div>
            </div>
            <div style={{ textAlign: 'center', padding: '0 20px', marginTop: '20px', fontSize: '1.2em' }}>
                <p>
                    This app is designed to enhance productivity and streamline task management within your team or organization. 
                    With user-friendly features and intuitive design, you can effortlessly track the progress of tasks, ensure timely 
                    completion, and boost overall efficiency.
                </p>
                <p>
                    Whether you are managing a small team or a large project, our Task Manager App provides the tools you need to 
                    stay organized and keep everyone on the same page. Start managing your tasks effectively today!
                </p>
            </div>
            <footer className='footer-container' style={{ backgroundColor: '#343a40', color: '#fff', padding: '20px 0', textAlign: 'center', marginTop: '40px' }}>
                <div style={{ marginBottom: '20px' }}>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#fff' }}>Facebook</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#fff' }}>Twitter</a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#fff' }}>LinkedIn</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px', color: '#fff' }}>Instagram</a>
                </div>
                <div style={{ marginBottom: '20px' }}>
                
                
                <p> 2024 Task Manager. All rights reserved.</p>    
                    
                     
                </div>
                
                <p>Contact Us: <a href="mailto:support@taskmanager.com" style={{ color: '#fff' }}>support@taskmanager.com</a></p>
                <p>Phone: +2547200000000</p>
                <p><a href="/privacy-policy" style={{ color: '#fff' }}>Privacy Policy</a> | <a href="/terms-of-service" style={{ color: '#fff' }}>Terms of Service</a></p>
            </footer>
        </div>
    );
};

export default Home;
