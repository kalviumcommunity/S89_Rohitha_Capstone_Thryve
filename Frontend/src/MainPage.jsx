import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Notes from './Notes';
import Calender from './Calender';
import SearchBar from './SearchBar';
import './MainPage.css';

const websiteVideos = [
  {
    title: "Make Tomatoe soup in 10 min",
    url: "https://youtu.be/szjZ3vqwyXE"
  },
  {
    title: "Yoga at home full tutorial in 15 min",
    url: "https://youtu.be/3X0hEHop8ec"
  },
  {
    title: "DIY a Pottery Bowl at home",
    url: "https://youtu.be/2bSGnF3nXnE"
  },
  {
    title: "Editing for begginers",
    url: "https://youtu.be/g9G218IncLw"
  }
];

function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const quotes = [
    "Keep fighting, even when the chance is small.",
    "Believe in yourself and all that you are.",
    "Every day is a new beginning.",
    "Success is not for the lazy.",
    "Push yourself, because no one else is going to do it for you.",
    "Dream it. Wish it. Do it.",
    "Stay positive, work hard, make it happen.",
    "Great things never come from comfort zones.",
    "Don’t stop until you’re proud.",
    "Difficult roads often lead to beautiful destinations."
  ];

  const [quote, setQuote] = useState(quotes[0]);
  const [showNotes, setShowNotes] = useState(false);
  const handleNotesOpen = () => setShowNotes(true);
  const handleNotesClose = () => setShowNotes(false);

  const [showCalendar, setShowCalendar] = useState(false);
  const handleCalendarOpen = () => setShowCalendar(true);
  const handleCalendarClose = () => setShowCalendar(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    const email = params.get("email");
    if (name && email) {
      localStorage.setItem("user", JSON.stringify({ name, email }));
      window.history.replaceState({}, document.title, "/main");
    }
  }, [location.search]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name || "User";

  // Video upload handler
  const handleFileChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    const user = JSON.parse(localStorage.getItem('user'));
    const formData = new FormData();
    formData.append('video', file);
    formData.append('uploaderEmail', user.email); // <-- Add uploaderEmail

    try {
      const response = await fetch('http://localhost:8080/recipes/upload', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        alert('Video uploaded successfully!');
        navigate('/videos');
      } else {
        alert('Upload failed.');
      }
    } catch (err) {
      alert('Error uploading video.');
    }
  }
};

  // User-uploaded videos from backend
  const [userVideos, setUserVideos] = useState([]);
  useEffect(() => {
    fetch('http://localhost:8080/recipes/videos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data.videos)) {
          setUserVideos(
            data.videos.map(filename => ({
              title: filename,
              url: `http://localhost:8080/recipes/videos/${filename}`
            }))
          );
        } else {
          setUserVideos([]);
        }
      })
      .catch(() => setUserVideos([]));
  }, []);

  const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  return (
    <div className="main-page">
      <header className="navbar">
        <div className="logo">Thryve</div>
        <nav>
          <ul>
            <li><Link to="/main">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/fitness">Fitness</Link></li>
            <li><Link to="/diy">DIY</Link></li>
            <li><Link to="/ai">AI</Link></li>
            <li><Link to="/study">Study</Link></li>
            
          </ul>
        </nav>
        <div className="icons" style={{ position: "relative" }}>
          <SearchBar
            websiteVideos={websiteVideos}
            userVideos={userVideos}
            YOUTUBE_API_KEY={YOUTUBE_API_KEY}
          />
          <span className="icon" style={{ cursor: "pointer" }} onClick={handleNotesOpen}>📋</span>
          <span className="icon" style={{ cursor: "pointer" }} onClick={handleCalendarOpen}>📅</span>
          <span className="icon" style={{ cursor: "pointer" }} onClick={() => navigate('/profile')}>👤</span>
        </div>
      </header>

      <div className="background-overlay">
        <div className="content-area">
          <div className='quote-section'>
            <div className="quote">{quote}</div>
          </div>

          <div className="welcome-section">
            <h1>Welcome Back<br />{userName}</h1>
            <p className="suggestion-title">Want to check these out</p>
            <div className="cards">
              <div className="card card1" onClick={() => {
                window.open("https://youtu.be/szjZ3vqwyXE", "_self")
              }}>
                <p>Make Tomatoe soup in 10 min</p>
              </div>
              <div className="card card2" onClick={() => {
                window.open("https://youtu.be/3X0hEHop8ec", "_self")
              }}>
                <p>Yoga at home full tutorial in 15 min</p>
              </div>
              <div className="card card3" onClick={() => {
                window.open("https://youtu.be/2bSGnF3nXnE", "_self")
              }}>
                <p>DIY a Pottery Bowl at home</p>
              </div>
              <div className="card card4" onClick={() => {
                window.open("https://youtu.be/g9G218IncLw", "_self")
              }}>
                <p>Editing for begginers</p>
              </div>
            </div>
          </div>
        </div>

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
        <input
          type="file"
          accept="video/*"
          id="video-upload"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <button
          className="floating-add-btn"
          onClick={() => document.getElementById("video-upload").click()}
          title="Add a new video"
        >
          +
        </button>
      </div>

      <Notes show={showNotes} onClose={handleNotesClose} />
      <Calender show={showCalendar} onClose={handleCalendarClose} />
    </div>
  );
}

export default MainPage;