import React from 'react';
import './StudyPage.css';
import { Link } from 'react-router-dom';

function StudyPage() {
  return (
    <div className="study-page">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Thryve</div>
        <ul className="nav-links">
          <li><Link to="/main">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/fitness">Fitness</Link></li>
          <li><Link to="/diy">DIY</Link></li>
          <li><Link to="/ai">AI</Link></li>
          
          <li className="active">Study</li>
        </ul>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <span role="img" aria-label="search">🔍</span>
        </div>
      </nav>

      {/* Main content */}
      <div className="content">
        <h2 className="main-heading">Score Perfect scores <br/> on your exams</h2>

        <h3 className="section-heading">Summaries of topics</h3>
        <div className="card-container">
          
          <div className="card design" onClick={()=>{
            window.open("https://youtu.be/GQS7wPujL2k","_self")
          }}><span>Designing for begginers</span></div>
          
          <div className="card accounts" onClick={()=>{
            window.open("https://youtu.be/yYX4bvQSqbo","_self")
          }}><span>Accounts for students</span></div>
          
          <div className="card coding" onClick={()=>{
            window.open("https://youtu.be/eKqY-oP1d_Y","_self")
          }}><span>Coding for begginers</span></div>
          
          <div className="card editing" onClick={()=>{
            window.open("https://youtu.be/y7Ci_H9bYEk","_self")
          }}><span>Editing for youtubers</span></div>
          
          <div className="card templates" onClick={()=>{
            window.open("https://youtu.be/r7hULM1qRf4","_self")
          }}><span>Templates for videos</span></div>

          <div className="card enter" onClick={()=>{
            window.open("https://youtu.be/eHJnEHyyN1Y","_self")
          }}><span>Entrepreneurship</span></div>
          
          <div className="card bio" onClick={()=>{
            window.open("https://youtu.be/BjzH4Hr_wGg","_self")
          }}><span>Biochemistry</span></div>
          
          <div className="card python" onClick={()=>{
            window.open("https://youtu.be/QXeEoD0pB3E","_self")
          }}><span>Python for beginners</span></div>

          

        </div>

        
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="about">
          <h4>About our website</h4>
          <p>
            Welcome to Thryve, the ultimate online hub designed by a student, for students. 
            Whether you're looking to connect with peers, access academic resources, or stay fit and eat healthy, we’ve got you covered
          </p>
        </div>
        <div className="contact">
          <strong>Contact:</strong> +91 9494568800, +91 8500016359
          
        </div>
      </footer>
    </div>
  );
}

export default StudyPage;
