import React, { useEffect, useState } from 'react';
import './VideoGallery.css';

function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [editing, setEditing] = useState(null);
  const [newName, setNewName] = useState('');
  const [likes, setLikes] = useState({}); // { filename: true/false }

  // Fetch videos
  const fetchVideos = () => {
    fetch('http://localhost:8080/recipes/videos')
      .then(res => res.json())
      .then(data => setVideos(data.videos || []));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Like/unlike handler
  const toggleLike = (filename) => {
    setLikes(prev => ({
      ...prev,
      [filename]: !prev[filename]
    }));
  };

  // Delete handler
  const handleDelete = async (filename) => {
    if (!window.confirm('Are you sure you want to delete this video?')) return;
    const res = await fetch(`http://localhost:8080/recipes/videos/${filename}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      fetchVideos();
    } else {
      alert('Failed to delete video.');
    }
  };

  // Edit handler
  const handleEdit = async (filename) => {
    if (!newName.trim()) {
      alert('Please enter a new name.');
      return;
    }
    const ext = filename.substring(filename.lastIndexOf('.'));
    let safeName = newName.trim();
    if (!safeName.endsWith(ext)) safeName += ext;

    const res = await fetch(`http://localhost:8080/recipes/videos/${filename}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newName: safeName }),
    });
    if (res.ok) {
      setEditing(null);
      setNewName('');
      fetchVideos();
    } else {
      alert('Failed to rename video.');
    }
  };

  return (
    <div className="videogallery-container">
      <h2 className="videogallery-title">Uploaded Videos</h2>
      <div className="videogallery-grid">
        {videos.length === 0 && <p>No videos uploaded yet.</p>}
        {videos.map((filename) => (
          <div key={filename} className="videogallery-card">
            <video
              src={`http://localhost:8080/uploads/${filename}`}
              controls
              className="videogallery-video"
            />
            <div className="videogallery-filename">{filename}</div>
            {editing === filename ? (
              <div className="videogallery-edit-row">
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="New file name"
                />
                <button onClick={() => handleEdit(filename)}>Save</button>
                <button onClick={() => { setEditing(null); setNewName(''); }}>Cancel</button>
              </div>
            ) : (
              <div className="videogallery-actions">
                <button className="edit-btn" onClick={() => { setEditing(filename); setNewName(filename.replace(/\.[^/.]+$/, "")); }}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(filename)}>Delete</button>
                <button
                  className={`like-btn${likes[filename] ? ' liked' : ''}`}
                  onClick={() => toggleLike(filename)}
                  aria-label={likes[filename] ? "Unlike" : "Like"}
                >
                  {likes[filename] ? '❤️' : '🤍'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoGallery;