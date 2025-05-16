import React from 'react';
import './AiPage.css';
import { Link } from 'react-router-dom';

function AiPage() {
  return (
    <div className="ai-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Thryve</div>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/fitness">Fitness</Link></li>
          <li><Link to="/diy">DIY</Link></li>
          <li className="active">AI</li>
          <li><Link to="/study">Study</Link></li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </nav>

      {/* Chat Interface */}
      <div className="chat-box">
        <div className="message bot">Hi, what can I help you with?</div>
        <div className="message user">Whats the weather today??</div>
        <div className="input-area">
          <span role="img" aria-label="image">🖼️</span>
          <input type="text" placeholder="Hello, How can I help?" />
          <span role="img" aria-label="send">⤴️</span>
        </div>
      </div>
    </div>
  );
}

export default AiPage;
