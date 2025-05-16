import { Link } from 'react-router-dom';
import React from 'react';
import './MainPage.css';

function MainPage() {
  return (
    <div className="main-page">
      <header className="navbar">
        <div className="logo">Thryve</div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/fitness">Fitness</Link></li>
            <li><Link to="/diy">DIY</Link></li>
            <li><Link to="/ai">AI</Link></li>
            <li><Link to="/study">Study</Link></li>
          </ul>
        </nav>
        <div className="icons">
          <input type="text" placeholder="Search" className="search-box" />
          <span className="icon">📋</span>
          <span className="icon">📅</span>
          <span className="icon">👤</span>
        </div>
      </header>

      <div className="background-overlay">
       <div className='quote-section'>
         <div className="quote">Keep fighting, even when the chance is small.</div>
       </div>

        <div className="welcome-section">
          <h1>Welcome Back<br />Rohitha</h1>
          <p className="suggestion-title">Want to check these out</p>
          <div className="cards">
            <div className="card card1">
              <p>Make Tomatoe soup in 10 min</p>
            </div>
            <div className="card card2">
              <p>Yoga at home full tutorial in 15 min</p>
            </div>
            <div className="card card3">
              <p>DIY a Pottery Bowl at home</p>
            </div>
          </div>
        </div>

        {/* Footer */}
      <footer>
        <div className="footer-container">
          <div className="footer-left">
            <h3>About our website</h3>
            <p>
              Welcome to Thryve, the ultimate online hub designed by a student,
              for students. Whether you're looking to connect with peers, access
              academic resources, or stay fit and eat healthy, we’ve got you
              covered.
            </p>
          </div>
          <div className="footer-right">
            <h3>Contact:</h3>
            <p>+91 9494568800, +91 8500016359</p>
            <div className="footer-icons">
              <i data-feather="instagram"></i>
              <i data-feather="twitter"></i>
              <i data-feather="facebook"></i>
              <i data-feather="youtube"></i>
            </div>
          </div>
        </div>
      </footer>
      </div>
    </div>
  );
}

export default MainPage;
