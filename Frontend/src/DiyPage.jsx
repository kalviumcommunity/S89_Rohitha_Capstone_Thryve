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
          <li><Link to="/main">Home</Link></li>
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
          <div className="card pottery" onClick={()=>{
            window.open("https://youtu.be/JzE3g9KrdOQ","_self")
          }}><span>Pottery all<br />by yourself</span></div>
          <div className="card table" onClick={()=>{
            window.open("https://youtu.be/inpok4MKVLM","_self")
          }}><span>Make a table<br />at home</span></div>
          <div className="card baskets" onClick={()=>{
            window.open("https://youtu.be/LtaW6dKSn-U","_self")
          }}><span>Knit baskets on<br />your own</span></div>
          <div className="card sweater" onClick={()=>{
            window.open("https://youtu.be/EhtD0tcqc6E","_self")
          }}><span>Knit sweater on<br />your own</span></div>
          <div className="card canvas" onClick={()=>{
            window.open("https://youtu.be/-SQuTiu8wWU","_self")
          }}><span>Painting a canvas on<br />your own</span></div>
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
