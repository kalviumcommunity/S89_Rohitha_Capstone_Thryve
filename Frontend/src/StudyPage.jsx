import React from 'react';
import './StudyPage.css';
import { Link } from 'react-router-dom';

function StudyPage() {
  return (
    <div className="study-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Thryve</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/fitness">Fitness</Link></li>
          <li><Link to="/diy">DIY</Link></li>
          <li><Link to="/ai">AI</Link></li>
          <li className="active">Study</li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </nav>

      {/* Main content */}
      <div className="content">
        <h2 className="main-heading">Score Perfect scores on your exams</h2>

        <h3 className="section-heading">Summaries of topics</h3>
        <div className="card-container">
          <div className="card design"><span>Designing for begginers</span></div>
          <div className="card accounts"><span>Accounts for students</span></div>
          <div className="card coding"><span>Coding for begginers</span></div>
        </div>

        <h3 className="section-heading">Connect with other students</h3>
        <div className="card-container">
          <div className="card connect"><span>Join Now</span></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="about">
          <h4>About our website</h4>
          <p>
            Welcome to Thryve, the ultimate online hub designed by a student, for students. 
            Whether you're looking to connect with peers, access academic resources, or stay fit and eat healthy, we’ve got you covered
          </p>
        </div>
        <div className="contact">
          <strong>Contact:</strong> +91 9494568800, +91 8500016359
          <div className="social-icons">
            <span>📸</span>
            <span>🐦</span>
            <span>📘</span>
            <span>▶️</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default StudyPage;
