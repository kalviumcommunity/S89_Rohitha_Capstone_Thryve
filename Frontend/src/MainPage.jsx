import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './MainPage.css';

function MainPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Motivational quotes array
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

  // State for the current quote
  const [quote, setQuote] = useState(quotes[0]);

  // Notes modal state
  const [showNotes, setShowNotes] = useState(false);

  // Calendar modal state
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(() => {
    return localStorage.getItem('userCalendarDate') || '';
  });
  const [calendarEvents, setCalendarEvents] = useState(() => {
    const saved = localStorage.getItem('userCalendarEvents');
    return saved ? JSON.parse(saved) : {};
  });
  const [eventInput, setEventInput] = useState('');

  // Notes array: [{id, title, content}]
  const [notesList, setNotesList] = useState(() => {
    const saved = localStorage.getItem('userNotesList');
    return saved ? JSON.parse(saved) : [{ id: 1, title: "Note 1", content: "" }];
  });
  const [activeNoteId, setActiveNoteId] = useState(
    () => (JSON.parse(localStorage.getItem('userNotesList'))?.[0]?.id || 1)
  );

  useEffect(() => {
    localStorage.setItem('userNotesList', JSON.stringify(notesList));
  }, [notesList]);

  // Store user info from query params if present (for Google OAuth)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const name = params.get("name");
    const email = params.get("email");
    if (name && email) {
      localStorage.setItem("user", JSON.stringify({ name, email }));
      window.history.replaceState({}, document.title, "/main");
    }
  }, [location.search]);

  // Pick a random quote on mount/refresh
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setQuote(quotes[randomIndex]);
  }, []);

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user?.name || "User";

  // Video upload handler
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('video', file);

      try {
        const response = await fetch('http://localhost:8080/recipes/upload', {
          method: 'POST',
          body: formData,
        });
        if (response.ok) {
          alert('Video uploaded successfully!');
          navigate('/videos'); // Redirect to videos page after OK
        } else {
          alert('Upload failed.');
        }
      } catch (err) {
        alert('Error uploading video.');
      }
    }
  };

  // Notes handlers
  const handleNotesOpen = () => setShowNotes(true);
  const handleNotesClose = () => setShowNotes(false);

  const handleNoteChange = (e) => {
    setNotesList(notesList.map(note =>
      note.id === activeNoteId ? { ...note, content: e.target.value } : note
    ));
  };

  const handleAddNote = () => {
    const newId = notesList.length ? Math.max(...notesList.map(n => n.id)) + 1 : 1;
    const newNote = { id: newId, title: `Note ${newId}`, content: "" };
    setNotesList([...notesList, newNote]);
    setActiveNoteId(newId);
  };

  const handleDeleteNote = (id) => {
    const filtered = notesList.filter(note => note.id !== id);
    setNotesList(filtered.length ? filtered : [{ id: 1, title: "Note 1", content: "" }]);
    setActiveNoteId(filtered.length ? filtered[0].id : 1);
  };

  const handleSwitchNote = (id) => setActiveNoteId(id);

  const activeNote = notesList.find(note => note.id === activeNoteId) || notesList[0];

  // Calendar handlers
  const handleCalendarOpen = () => setShowCalendar(true);
  const handleCalendarClose = () => setShowCalendar(false);
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    localStorage.setItem('userCalendarDate', e.target.value);
  };
  const handleEventInput = (e) => setEventInput(e.target.value);

  const handleAddEvent = () => {
    if (!selectedDate || !eventInput.trim()) return;
    const updated = {
      ...calendarEvents,
      [selectedDate]: [...(calendarEvents[selectedDate] || []), eventInput.trim()]
    };
    setCalendarEvents(updated);
    setEventInput('');
    localStorage.setItem('userCalendarEvents', JSON.stringify(updated));
  };

  const handleDeleteEvent = (date, idx) => {
    const updated = { ...calendarEvents };
    updated[date].splice(idx, 1);
    if (updated[date].length === 0) delete updated[date];
    setCalendarEvents(updated);
    localStorage.setItem('userCalendarEvents', JSON.stringify(updated));
  };

  // Show notification for today's events
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
    const today = new Date().toISOString().slice(0, 10);
    const todaysEvents = calendarEvents[today];
    if (todaysEvents && todaysEvents.length > 0) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          new Notification("Today's Events", {
            body: todaysEvents.join('\n')
          });
        }
      });
    }
    // Only run on mount
    // eslint-disable-next-line
  }, []);

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
            <li><Link to="/videos">Videos</Link></li>
          </ul>
        </nav>
        <div className="icons">
          <input type="text" placeholder="Search" className="search-box" />
          <span className="icon" style={{ cursor: "pointer" }} onClick={handleNotesOpen}>📋</span>
          <span className="icon" style={{ cursor: "pointer" }} onClick={handleCalendarOpen}>📅</span>
          <span className="icon">👤</span>
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

        {/* Footer stays outside content-area but still inside background-overlay */}
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
        {/* Floating Add Button */}
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

      {/* Notes Modal with multiple notes */}
      {showNotes && (
        <div className="notes-modal">
          <div className="notes-content">
            <div className="notes-header">
              <span>📝 Notes</span>
              <button className="notes-close" onClick={handleNotesClose}>×</button>
            </div>
            <div className="notes-tabs">
              {notesList.map(note => (
                <div
                  key={note.id}
                  className={`notes-tab${note.id === activeNoteId ? " active" : ""}`}
                  onClick={() => handleSwitchNote(note.id)}
                >
                  {note.title}
                  {notesList.length > 1 && (
                    <span
                      className="notes-delete"
                      onClick={e => { e.stopPropagation(); handleDeleteNote(note.id); }}
                      title="Delete note"
                    >×</span>
                  )}
                </div>
              ))}
              <button className="notes-add" onClick={handleAddNote} title="Add note">+</button>
            </div>
            <textarea
              value={activeNote.content}
              onChange={handleNoteChange}
              placeholder="Type your notes here..."
              autoFocus
            />
          </div>
        </div>
      )}

      {/* Calendar Modal with events */}
      {showCalendar && (
        <div className="calendar-modal">
          <div className="calendar-content">
            <div className="calendar-header">
              <span>📅 Calendar</span>
              <button className="calendar-close" onClick={handleCalendarClose}>×</button>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
              className="calendar-input"
            />
            {selectedDate && (
              <>
                <div className="calendar-selected">
                  Events for: {selectedDate}
                </div>
                <ul className="calendar-events-list">
                  {(calendarEvents[selectedDate] || []).map((event, idx) => (
                    <li key={idx}>
                      {event}
                      <button className="calendar-event-delete" onClick={() => handleDeleteEvent(selectedDate, idx)}>×</button>
                    </li>
                  ))}
                </ul>
                <div className="calendar-event-input-row">
                  <input
                    type="text"
                    value={eventInput}
                    onChange={handleEventInput}
                    placeholder="Add event..."
                    className="calendar-event-input"
                    onKeyDown={e => { if (e.key === "Enter") handleAddEvent(); }}
                  />
                  <button className="calendar-event-add" onClick={handleAddEvent}>Add</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;