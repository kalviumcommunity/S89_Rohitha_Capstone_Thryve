import React, { useEffect, useState } from 'react';

function VideoGallery() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/recipes/videos')
      .then(res => res.json())
      .then(data => setVideos(data.videos || []));
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Uploaded Videos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
        {videos.length === 0 && <p>No videos uploaded yet.</p>}
        {videos.map((filename) => (
          <video
            key={filename}
            src={`http://localhost:8080/uploads/${filename}`}
            controls
            width={320}
            style={{ borderRadius: '10px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
          />
        ))}
      </div>
    </div>
  );
}

export default VideoGallery;