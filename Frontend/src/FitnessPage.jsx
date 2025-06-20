import React from 'react';
import './FitnessPage.css';
import { Link, useNavigate } from 'react-router-dom';

function FitnessPage() {
  const navigate = useNavigate();
  return (
    <div className="fitness-page">
      {/* Navbar */}
      <nav className="fitness-navbar">
        <div className="fitness-logo">Thryve</div>
        <ul className="fitness-nav-links">
          <li><Link to="/main">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li className="active"><Link to="/fitness">Fitness</Link></li>
          <li><Link to="/diy">DIY</Link></li>
          <li><Link to="/ai">AI</Link></li>
          <li><Link to="/study">Study</Link></li>
          
        </ul>
        <div className="fitness-search-bar">
          <input type="text" placeholder="Search" />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </nav>

      <div className="fitness-heading">
        <h2>Burn all those extra<br />calories off</h2>
      </div>

      <div className="fitness-section">
        <h3>Fitness at home</h3>
        <div className="fitness-card-container">
          <div className="fitness-card fitness-weights" onClick={() => window.open("https://youtu.be/2tM1LFFxeKg", "_self")}><span>Weights tutorial at home</span></div>
          <div className="fitness-card fitness-running" onClick={() => window.open("https://youtu.be/5r7w3R6eF2o", "_self")}><span>Running methods at home</span></div>
          <div className="fitness-card fitness-planks" onClick={() => window.open("https://youtu.be/pSHjTRCQxIw", "_self")}><span>Abdomens and planks</span></div>
          <div className="fitness-card fitness-crunches" onClick={() => window.open("https://youtu.be/Xyd_fa5zoEU", "_self")}><span>5 min crunches</span></div>
          <div className="fitness-card fitness-exercise" onClick={() => window.open("https://youtu.be/2pLT-olgUJs", "_self")}><span>Hand and Leg exercises</span></div>
          <div className="fitness-card fitness-drills" onClick={() => window.open("https://youtu.be/o7SUtgpPoYw", "_self")}><span>Coordination Drills</span></div>
          <div className="fitness-card fitness-lunges" onClick={() => window.open("https://youtu.be/p-R0HSfL6nw", "_self")}><span>Lunges</span></div>
          <div className="fitness-card fitness-zumba" onClick={() => window.open("https://youtu.be/KJHkudnpHds", "_self")}><span>Zumba</span></div>
          <div className="fitness-card fitness-cardio" onClick={() => window.open("https://youtu.be/_fesO5oNcEs", "_self")}><span>Cardio</span></div>
        </div>
      </div>

      <div className="fitness-heading">
        <h2>Be patient and calm<br />at any situation</h2>
      </div>

      <div className="fitness-section">
        <h3>Yoga and Meditation</h3>
        <div className="fitness-card-container">
          <div className="fitness-card fitness-meditation" onClick={() => window.open("https://youtu.be/inpok4MKVLM", "_self")}><span>5 min Meditation at home</span></div>
          <div className="fitness-card fitness-breathing" onClick={() => window.open("https://youtu.be/8VwufJrUhic", "_self")}><span>Breathing exercises at home</span></div>
          <div className="fitness-card fitness-yoga" onClick={() => window.open("https://youtu.be/EvMTrP8eRvM", "_self")}><span>Simple yoga at home</span></div>
          <div className="fitness-card fitness-asanas" onClick={() => window.open("https://youtu.be/LYxxH1hFj9E", "_self")}><span>Asanas at home</span></div>
          <div className="fitness-card fitness-pranayamam" onClick={() => window.open("https://youtu.be/I77hh5I69gA", "_self")}><span>Pranayamam</span></div>
          <div className="fitness-card fitness-anxiety" onClick={() => window.open("https://youtu.be/mKW4ZFP8bGY", "_self")}><span>Controll your anxiety</span></div>
          <div className="fitness-card fitness-music" onClick={() => window.open("https://youtu.be/cF-w7jzVWcM", "_self")}><span>10min music for meditation</span></div>
          <div className="fitness-card fitness-surya" onClick={() => window.open("https://youtu.be/aJb1AWMc-64", "_self")}><span>SuryaNamaskaram at home</span></div>
          <div className="fitness-card fitness-about" onClick={() => window.open("https://youtu.be/Pzaai8azbqA", "_self")}><span>About Yoga and roots</span></div>
        </div>
      </div>

      <footer className="fitness-footer">
        <div className="fitness-about">
          <h4>About our website</h4>
          <p>
            Welcome to Thryve, the ultimate online hub designed by a student, for students.
            Whether you're looking to connect with peers, access academic resources, or stay
            fit and eat healthy, we’ve got you covered
          </p>
        </div>
        <div className="fitness-contact">
          <strong>Contact:</strong> +91 9494568800, +91 8500016359
          <div className="fitness-social-icons">
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