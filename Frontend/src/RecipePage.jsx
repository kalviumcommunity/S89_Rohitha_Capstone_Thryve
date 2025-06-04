import React from 'react';
import './RecipePage.css';
import { Link } from 'react-router-dom';

function RecipePage() {
  return (
    <div className="recipe-container">
      {/* Navbar */}
      <nav className="recipe-navbar">
        <div className="recipe-logo">Thryve</div>
        <ul className="recipe-nav-links">
          <li><Link to="/main">Home</Link></li>
          <li className="active"><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/fitness">Fitness</Link></li>
          <li><Link to="/diy">DIY</Link></li>
          <li><Link to="/ai">AI</Link></li>
          <li><Link to="/study">Study</Link></li>
        </ul>
        <div className="recipe-search-bar">
          <input type="text" placeholder="Search" />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </nav>

      {/* Heading */}
      <div className="recipe-heading">
        <h2>Wanna Eat healthy which can be made easily,<br />Here you go</h2>
      </div>

      {/* 5 min Recipes */}
      <div className="recipe-section">
        <h3>5 min Recipes</h3>
        <div className="recipe-card-container">
          <div className="recipe-card brownies" onClick={()=>{
            window.open("https://youtu.be/lIb_741_dIw","_self")
          }}> <span>Choco Fudge Brownies</span></div>
          <div className="recipe-card pasta" onClick={()=>{
            window.open("https://youtu.be/zSCTYKUeLQg","_self")
          }}> <span>Red sauce penne pasta</span></div>
          <div className="recipe-card soup" onClick={()=>{
            window.open("https://youtu.be/szjZ3vqwyXE","_self")
          }}> <span>Tomatoe Basil Soup</span></div>
          <div className="recipe-card white" onClick={()=>{
            window.open("https://youtu.be/Mb_rmBxJ9Cc","_self")
          }} ><span>White sauce pasta</span></div>
          <div className="recipe-card manchuria" onClick={()=>{
            window.open("https://youtu.be/iuc0qT8kSJo","_self")
          }} ><span>Manchuria</span></div>
          <div className="recipe-card soup" onClick={()=>{
            window.open("https://youtu.be/szjZ3vqwyXE","_self")
          }}> <span>Tomatoe Basil Soup</span></div>
          <div className="recipe-card white" onClick={()=>{
            window.open("https://youtu.be/Mb_rmBxJ9Cc","_self")
          }} ><span>White sauce pasta</span></div>
          <div className="recipe-card manchuria" onClick={()=>{
            window.open("https://youtu.be/iuc0qT8kSJo","_self")
          }} ><span>Manchuria</span></div>
        </div>
      </div>

      {/* Healthy Recipes */}
      <div className="recipe-section">
        <h3>Healthy Recipies</h3>
        <div className="recipe-card-container">
          <div className="recipe-card sandwich" onClick={()=>{
            window.open("https://youtu.be/BlzJzavriHw","_self")
          }}> <span>Brown bread Sandwhich</span></div>
          <div className="recipe-card tacos" onClick={()=>{
            window.open("https://youtu.be/X8-Q-JHHSFw","_self")
          }}> <span>Veggies stuffed Tacos</span></div>
          <div className="recipe-card rolls" onClick={()=>{
            window.open("https://youtu.be/7DuHn0kx0Ps","_self")
          }}> <span>Salad stuffed Rolls</span></div>
          <div className="recipe-card rice" onClick={()=>{
            window.open("https://www.youtube.com/shorts/6NDB035TTFw?feature=share","_self")
          }}> <span>Fried Rice</span></div>
          <div className="recipe-card curry" onClick={()=>{
            window.open("https://youtu.be/nhs0deABmLM","_self")
          }}> <span>Potatoe curry</span></div>
          <div className="recipe-card rolls" onClick={()=>{
            window.open("https://youtu.be/7DuHn0kx0Ps","_self")
          }}> <span>Salad stuffed Rolls</span></div>
          <div className="recipe-card rice" onClick={()=>{
            window.open("https://www.youtube.com/shorts/6NDB035TTFw?feature=share","_self")
          }}> <span>Fried Rice</span></div>
          <div className="recipe-card curry" onClick={()=>{
            window.open("https://youtu.be/nhs0deABmLM","_self")
          }}> <span>Potatoe curry</span></div>
        </div>
      </div>

      {/* Footer */}
      <footer className="recipe-footer">
        <div className="recipe-about">
          <h4>About our website</h4>
          <p>
            Welcome to Thryve, the ultimate online hub designed by a student, for students.
            Whether you're looking to connect with peers, access academic resources, or stay
            fit and eat healthy, we’ve got you covered
          </p>
        </div>
        <div className="recipe-contact">
          <strong>Contact:</strong> +91 9494568800, +91 8500016359
          <div className="recipe-social-icons">
            <span>📸</span>
            <span>🐦</span>
            <span>📘</span>
            <span>▶</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default RecipePage;