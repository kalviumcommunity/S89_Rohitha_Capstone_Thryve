import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import './HomePage.css';

function HomePage() {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <div className="home-container">
      {/* Header */}
      <div className="header">
        <h1>Thryve</h1>
        <p className="tagline">Broke? Busy? Thryve Anyway!</p>
        <div className="header-buttons">
          <Link to="/login" className="nav-button">LOG IN</Link>
          <Link to="/signup" className="nav-button">SIGN UP</Link>
        </div>
      </div>

      {/* Card Grid */}
      <div className="card-grid">
        <div className="top-row">
          <Card className="recipes" title="Recipes" text="Want to make healthy and easy recipes in 5min??" />
          <Card className="fitness" title="Fitness" text="Want to burn all those extra calories??" />
          <Card className="diy" title="DIY" text="Want to make your own DIY products??" />
        </div>
        <div className="bottom-row">
          <Card className="ai" title="AI" text="Want answers to your questions instantly??" />
          <Card className="study" title="Study" text="Want a perfect score on your exams??" />
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">

          <div className="about">
            <h3>About our website</h3>
            <p>
              Welcome to Thryve, the ultimate online hub designed by a student,
              for students. Whether you're looking to connect with peers, access
              academic resources, or stay fit and eat healthy, we’ve got you
              covered.
            </p>
          </div>
          <div className="contact">
            <h3>Contact:</h3>
            <p>+91 9494568800, +91 8500016359</p>
            <div className="social-icons">
              <i data-feather="instagram"></i>
              <i data-feather="twitter"></i>
              <i data-feather="facebook"></i>
              <i data-feather="youtube"></i>
            </div>
          </div>
      
      </footer>
    </div>
  );
}

function Card({ className, title, text }) {
  return (
    <div className={`card ${className}`}>
      <div className="overlay"></div>
      <div className="card-content">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default HomePage;