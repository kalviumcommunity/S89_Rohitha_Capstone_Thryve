import React, { useState, useEffect } from 'react';
import './Calender.css';

function Calender({ show, onClose }) {
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarEvents, setCalendarEvents] = useState(() => {
    const saved = localStorage.getItem('userCalendarEvents');
    return saved ? JSON.parse(saved) : {};
  });
  const [eventInput, setEventInput] = useState('');

  // Reset to today's date when modal opens
  useEffect(() => {
    if (show) {
      const today = new Date().toISOString().slice(0, 10);
      setSelectedDate(today);
    }
  }, [show]);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
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

  if (!show) return null;

  return (
    <div className="calendar-modal">
      <div className="calendar-content">
        <div className="calendar-header">
          <span>📅 Calendar</span>
          <button className="calendar-close" onClick={onClose}>×</button>
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
  );
}

export default Calender;