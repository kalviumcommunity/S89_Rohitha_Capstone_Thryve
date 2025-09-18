import React, { useState, useEffect } from 'react';
import './Notes.css';

function Notes({ show, onClose }) {
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

  if (!show) return null;

  return (
    <div className="notes-modal">
      <div className="notes-content">
        <div className="notes-header">
          <span>📝 Notes</span>
          <button className="notes-close" onClick={onClose}>×</button>
        </div>
        <div className="notes-tabs">
          {notesList.map((note, idx) => (
  <div
    key={note.id}
    className={`notes-tab${note.id === activeNoteId ? " active" : ""}`}
    onClick={() => handleSwitchNote(note.id)}
  >
    {`Note ${idx + 1}`}
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
  );
}

export default Notes;