import React, { useEffect, useState } from 'react';
import './FollowPage.css';

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

function FollowPage() {
  const [users, setUsers] = useState([]);
  const [following, setFollowing] = useState({});
  const currentUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Fetch all users except the current user
    fetch(`http://localhost:8080/user/all?email=${encodeURIComponent(currentUser.email)}`)
      .then(res => res.json())
      .then(data => setUsers(data.users || []));
  }, [currentUser.email]);

  const toggleFollow = (id) => {
    setFollowing(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    // Optionally, send follow/unfollow info to backend here
  };

  return (
    <div className="follow-page-container">
      <div className="follow-page-title">Suggested for you</div>
      <ul className="follow-user-list">
        {users.map(user => (
          <li key={user._id} className="follow-user-item">
            <div className="follow-user-info">
              <div className="follow-user-avatar">{getInitials(user.name)}</div>
              <div>
                <div style={{ fontWeight: 500 }}>{user.name}</div>
                <div style={{ fontSize: '0.92em', color: '#8e8e8e' }}>@{user.username || user.email.split('@')[0]}</div>
              </div>
            </div>
            <button
              className={`follow-btn${following[user._id] ? ' unfollow' : ''}`}
              onClick={() => toggleFollow(user._id)}
            >
              {following[user._id] ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FollowPage;