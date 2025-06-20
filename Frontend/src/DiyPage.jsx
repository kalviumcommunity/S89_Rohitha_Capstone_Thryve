import React from 'react';
import './DiyPage.css';
import { Link } from 'react-router-dom';

function DiyPage() {
  return (
    <div className="diy-page">
      {/* Navbar */}
      <nav className="diy-navbar">
        <div className="diy-logo">Thryve</div>
        <ul className="diy-nav-links">
          <li><Link to="/main">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/fitness">Fitness</Link></li>
          <li className="diy-active">DIY</li>
          <li><Link to="/ai">AI</Link></li>
          <li><Link to="/study">Study</Link></li>
          
        </ul>
        <div className="diy-search-bar">
          <input type="text" placeholder="Search" />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </nav>

      {/* Heading */}
      <div className="diy-heading">
        <h2>Make cute and easy stuff<br />all by yourself</h2>
      </div>

      <div className="diy-section">
        <h3>Do it yourself</h3>
        <div className="diy-card-container">
          
          <div className="diy-card diy-pottery" onClick={() => {
            window.open("https://youtu.be/JzE3g9KrdOQ", "_self")
          }}><span>Pottery all<br />by yourself</span></div>
          
          <div className="diy-card diy-table" onClick={() => {
            window.open("https://youtu.be/inpok4MKVLM", "_self")
          }}><span>Make a table<br />at home</span></div>
          
          <div className="diy-card diy-baskets" onClick={() => {
            window.open("https://youtu.be/LtaW6dKSn-U", "_self")
          }}><span>Knit baskets on<br />your own</span></div>
          
          <div className="diy-card diy-sweater" onClick={() => {
            window.open("https://youtu.be/EhtD0tcqc6E", "_self")
          }}><span>Knit sweater on<br />your own</span></div>
          
          <div className="diy-card diy-canvas" onClick={() => {
            window.open("https://youtu.be/-SQuTiu8wWU", "_self")
          }}><span>Painting a canvas on<br />your own</span></div>

          <div className="diy-card diy-candles" onClick={() => {
            window.open("https://youtu.be/GAh9lQmaEvI", "_self")
          }}><span>Scented Candles<br />by yourself</span></div>
          
          <div className="diy-card diy-lipbalm" onClick={() => {
            window.open("https://youtu.be/XhOmHo_7KzM", "_self")
          }}><span>Make your<br />own lipbalm</span></div>
          
          <div className="diy-card diy-laterns" onClick={() => {
            window.open("https://youtu.be/yT9B1mjKzhc", "_self")
          }}><span>Mason Jar Lanterns<br />at home</span></div>


        </div>
      </div>

      {/* Footer */}
      <footer className="diy-footer">
        <div className="diy-about">
          <h4>About our website</h4>
          <p>
            Welcome to Thryve, the ultimate online hub designed by a student, for students.
            Whether you're looking to connect with peers, access academic resources, or stay
            fit and eat healthy, we’ve got you covered
          </p>
        </div>
        <div className="diy-contact">
          <strong>Contact:</strong> +91 9494568800, +91 8500016359
          <div className="diy-social-icons">
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
