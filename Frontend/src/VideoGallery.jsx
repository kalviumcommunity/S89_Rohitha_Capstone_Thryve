import React, { useEffect, useState } from 'react';

function VideoGallery() {
  const [videos, setVideos] = useState([]);
  const [editing, setEditing] = useState(null); // filename being edited
  const [newName, setNewName] = useState('');

  // Fetch videos
  const fetchVideos = () => {
    fetch('http://localhost:8080/recipes/videos')
      .then(res => res.json())
      .then(data => setVideos(data.videos || []));
  };

  useEffect(() => {
    fetchVideos();
  }, []);

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
    // Ensure extension stays the same
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
    <div style={{ padding: '2rem' }}>
      <h2>Uploaded Videos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {videos.length === 0 && <p>No videos uploaded yet.</p>}
        {videos.map((filename) => (
          <div key={filename} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <video
              src={`http://localhost:8080/uploads/${filename}`}
              controls
              width={320}
              style={{ borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            />
            <div style={{ marginTop: 8, wordBreak: 'break-all', maxWidth: 320 }}>{filename}</div>
            {editing === filename ? (
              <div style={{ marginTop: 8 }}>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                  placeholder="New file name"
                  style={{ width: 180 }}
                />
                <button onClick={() => handleEdit(filename)} style={{ marginLeft: 4 }}>Save</button>
                <button onClick={() => { setEditing(null); setNewName(''); }} style={{ marginLeft: 4 }}>Cancel</button>
              </div>
            ) : (
              <div style={{ marginTop: 8 }}>
                <button onClick={() => { setEditing(filename); setNewName(filename.replace(/\.[^/.]+$/, "")); }}>Edit</button>
                <button onClick={() => handleDelete(filename)} style={{ marginLeft: 8, color: 'red' }}>Delete</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoGallery;