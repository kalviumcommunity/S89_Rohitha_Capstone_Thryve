import React, { useState } from 'react';
import './FollowPage.css';

const dummyUsers = [
  { id: 1, name: "Alice Johnson", isFollowing: false },
  { id: 2, name: "Bob Smith", isFollowing: false },
  { id: 3, name: "Charlie Lee", isFollowing: false },
  { id: 4, name: "Diana Patel", isFollowing: false },
  { id: 5, name: "Ethan Brown", isFollowing: false },
  { id: 6, name: "Fiona Clark", isFollowing: false },
  { id: 7, name: "George Miller", isFollowing: false },
  { id: 8, name: "Hannah Wilson", isFollowing: false },
  { id: 9, name: "Ivan Martinez", isFollowing: false },
  { id: 10, name: "Julia Kim", isFollowing: false },
  { id: 11, name: "Kevin Anderson", isFollowing: false },
  { id: 12, name: "Lily Thomas", isFollowing: false },
  { id: 13, name: "Mason White", isFollowing: false },
  { id: 14, name: "Nina Harris", isFollowing: false },
  { id: 15, name: "Oscar Young", isFollowing: false },
  { id: 16, name: "Priya Singh", isFollowing: false },
  { id: 17, name: "Quentin Evans", isFollowing: false },
  { id: 18, name: "Riya Gupta", isFollowing: false },
  { id: 19, name: "Sam Turner", isFollowing: false },
  { id: 20, name: "Tina Scott", isFollowing: false }
];

function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase();
}

function FollowPage() {
  const [users, setUsers] = useState(dummyUsers);

  const toggleFollow = (id) => {
    setUsers(users.map(user =>
      user.id === id ? { ...user, isFollowing: !user.isFollowing } : user
    ));
  };

  return (
    <div className="follow-page-container">
      <div className="follow-page-title">Suggested for you</div>
      <ul className="follow-user-list">
        {users.map(user => (
          <li key={user.id} className="follow-user-item">
            <div className="follow-user-info">
              <div className="follow-user-avatar">{getInitials(user.name)}</div>
              <div>
                <div style={{ fontWeight: 500 }}>{user.name}</div>
                <div style={{ fontSize: '0.92em', color: '#8e8e8e' }}>@{user.name.toLowerCase().replace(/\s/g, '')}</div>
              </div>
            </div>
            <button
              className={`follow-btn${user.isFollowing ? ' unfollow' : ''}`}
              onClick={() => toggleFollow(user.id)}
            >
              {user.isFollowing ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FollowPage;