import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfilePage.css';

function UserProfilePage() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [videos, setVideos] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    // Fetch user info
    fetch(`http://localhost:8080/user/${userId}`)
      .then(res => res.json())
      .then(data => setUser(data.user));

    // Fetch user's videos
    fetch(`http://localhost:8080/videos?userId=${userId}`)
      .then(res => res.json())
      .then(data => setVideos(data.videos || []));

    // Fetch followers and following lists
    fetch(`http://localhost:8080/user/${userId}/followers`)
      .then(res => res.json())
      .then(data => setFollowers(data.followers || []));
    fetch(`http://localhost:8080/user/${userId}/following`)
      .then(res => res.json())
      .then(data => setFollowing(data.following || []));
  }, [userId]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <div className="user-profile-avatar">{user.name[0]}</div>
        <div>
          <div className="user-profile-name">{user.name}</div>
          <div className="user-profile-username">@{user.username || user.email.split('@')[0]}</div>
        </div>
      </div>
      <div className="user-profile-stats">
        <div><strong>{videos.length}</strong> Videos</div>
        <div><strong>{followers.length}</strong> Followers</div>
        <div><strong>{following.length}</strong> Following</div>
      </div>
      <div className="user-profile-section">
        <h3>Uploaded Videos</h3>
        <ul className="user-profile-videos">
          {videos.map(video => (
            <li key={video._id}>{video.title}</li>
          ))}
        </ul>
      </div>
      <div className="user-profile-section">
        <h3>Followers</h3>
        <ul className="user-profile-list">
          {followers.map(f => (
            <li key={f._id}>{f.name}</li>
          ))}
        </ul>
      </div>
      <div className="user-profile-section">
        <h3>Following</h3>
        <ul className="user-profile-list">
          {following.map(f => (
            <li key={f._id}>{f.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserProfilePage;