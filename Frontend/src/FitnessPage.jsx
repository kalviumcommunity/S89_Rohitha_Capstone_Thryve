import React from 'react';
import './FitnessPage.css';
import { Link, useNavigate } from 'react-router-dom';

function FitnessPage() {
  const navigate = useNavigate();
  return (
    <div className="fitness-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Thryve</div>
        <ul className="nav-links">
          <li><Link to="/main">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li className="active">Fitness</li>
          <li><Link to="/diy">DIY</Link></li>
          <li><Link to="/ai">AI</Link></li>
          <li><Link to="/study">Study</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </nav>

      {/* Headings */}
      <div className="heading">
        <h2>Burn all those extra<br />calories off</h2>
      </div>

      <div className="section">
        <h3>Fitness at home</h3>
        <div className="card-container">
          <div className="card weights" onClick={()=>{
            window.open("https://youtu.be/I37XBO_re98","_self")
          }}><span>Weights tutorial at home</span></div>
          <div className="card running" onClick={()=>{
            window.open("https://youtu.be/kVnyY17VS9Y","_self")
          }}><span>Running methods at home</span></div>
          <div className="card planks" onClick={()=>{
            window.open("https://youtu.be/pvIjsG5Svck","_self")
          }}><span>Abdomens and planks</span></div>
          <div className="card crunches" onClick={()=>{
            window.open("https://youtu.be/0t4t3IpiEao","_self")
          }}><span>5 min crunches </span></div>
          <div className="card exercise" onClick={()=>{
            window.open("https://youtu.be/LhhWNixj5zE","_self")
          }}><span>Hand and Leg exercises</span></div>
        </div>
      </div>

      <div className="heading">
        <h2>Be patient and clam<br />at any situation</h2>
      </div>

      <div className="section">
        <h3>Yoga and Meditation</h3>
        <div className="card-container">
          <div className="card meditation" onClick={()=>{
            window.open("https://youtu.be/inpok4MKVLM","_self")
          }}><span>5 min Meditation at home</span></div>
          <div className="card breathing" onClick={()=>{
            window.open("https://youtu.be/-7-CAFhJn78","_self")
          }}><span>Breathing exercises at home</span></div>
          <div className="card yoga" onClick={()=>{
            window.open("https://youtu.be/EvMTrP8eRvM","_self")
          }}><span>Simple yoga at home</span></div>
          <div className="card asanas" onClick={()=>{
            window.open("https://youtu.be/LYxxH1hFj9E","_self")
          }}><span>Asanas at home</span></div>
          <div className="card pranayamam" onClick={()=>{
            window.open("https://youtu.be/I77hh5I69gA","_self")
          }}><span>Pranayamam</span></div>
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

export default FitnessPage;
