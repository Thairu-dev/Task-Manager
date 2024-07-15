import React from 'react';
import Navbar from './Navbar';
import './Home.css'; // Import the Home.css for styling

const Home = () => {
    return (
        <div className="home-container">
            <Navbar />
            <h1 className="home-heading">Ultimate Planner</h1>
            <div className="image-text-container">
                <img 
                    src={"./images/3894977.jpg"} 
                    className="home-image"
                    alt={"home-img"} 
                />
                <div className="text-container">
                    <h2 className="text-heading">
                        We help you manage tasks by letting you add users, add new tasks, and assign the tasks to your users.
                    </h2>
                </div>
            </div>
            <div className="paragraphs-container">
                <p className="paragraph">
                    This app is designed to enhance productivity and streamline task management within your team or organization. 
                    With user-friendly features and intuitive design, you can effortlessly track the progress of tasks, ensure timely 
                    completion, and boost overall efficiency.
                </p>
                <p className="paragraph">
                    Whether you are managing a small team or a large project, our Task Manager App provides the tools you need to 
                    stay organized and keep everyone on the same page. Start managing your tasks effectively today!
                </p>
            </div>
            <footer className="footer">
                <div className="social-links">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
                <div className="copyright">
                    <p>&copy; 2024 Task Manager. All rights reserved.</p>
                    <p><a href="/privacy-policy">Privacy Policy</a> | <a href="/terms-of-service">Terms of Service</a></p>
                </div>
                <div className="contact-info">
                    <p>Contact Us: <a href="mailto:support@taskmanager.com">support@yourcompany.com</a></p>
                    <p>Phone: +2547200000000</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
