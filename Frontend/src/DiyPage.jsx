import React from 'react';
import './DiyPage.css';
import { Link } from 'react-router-dom';

function DiyPage() {
  return (
    <div className="diy-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Thryve</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/fitness">Fitness</Link></li>
          <li className="active">DIY</li>
          <li><Link to="/ai">AI</Link></li>
          <li><Link to="/study">Study</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </nav>

      {/* Heading */}
      <div className="heading">
        <h2>Make cute and easy stuff<br />all by yourself</h2>
      </div>

      <div className="section">
        <h3>Do it yourself</h3>
        <div className="card-container">
          <div className="card pottery"><span>Pottery all<br />by yourself</span></div>
          <div className="card table"><span>Make a table<br />at home</span></div>
          <div className="card baskets"><span>Knit baskets on<br />your own</span></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="about">
          <h4>About our website</h4>
          <p>
            Welcome to Thryve, the ultimate online hub designed by a student, for students.
            Whether you're looking to connect with peers, access academic resources, or stay
            fit and eat healthy, we’ve got you covered
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

export default DiyPage;
