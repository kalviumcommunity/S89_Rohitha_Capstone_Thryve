import React from 'react';
import './RecipePage.css';
import { Link } from 'react-router-dom';

function RecipePage() {
  return (
    <div className="recipe-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Thryve</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li className="active">Recipes</li>
          <li><Link to="/fitness">Fitness</Link></li>
          <li><Link to="/diy">DIY</Link></li>
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
        <h2>Wanna Eat healthy which can be made easily,<br />Here you go</h2>
      </div>

      {/* 5 min Recipes */}
      <div className="section">
        <h3>5 min Recipes</h3>
        <div className="card-container">
          <div className="card brownies"><span>Choco Fudge Brownies</span></div>
          <div className="card pasta"><span>Red sauce penne pasta</span></div>
          <div className="card soup"><span>Tomatoe Basil Soup</span></div>
        </div>
      </div>

      {/* Healthy Recipes */}
      <div className="section">
        <h3>Healthy Recipies</h3>
        <div className="card-container">
          <div className="card sandwich"><span>Brown bread Sandwhich</span></div>
          <div className="card tacos"><span>Veggies stuffed Tacos</span></div>
          <div className="card rolls"><span>Salad stuffed Rolls</span></div>
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

export default RecipePage;
