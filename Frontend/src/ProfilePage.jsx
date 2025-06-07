import React from 'react';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    // Optionally clear other user data here
    navigate('/'); // Redirect to home or login
  };

  if (!user) {
    return (
      <div style={{ padding: 40 }}>
        <h2>You are not logged in.</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 400,
      margin: '60px auto',
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
      padding: 32,
      textAlign: 'center'
    }}>
      <h2>👤 Profile</h2>
      <div style={{ margin: '24px 0', fontSize: 18 }}>
        <div><b>Name:</b> {user.name}</div>
        <div><b>Email:</b> {user.email}</div>
      </div>
      <button
        style={{
          background: '#e74c3c',
          color: '#fff',
          border: 'none',
          borderRadius: 6,
          padding: '10px 28px',
          fontSize: 16,
          cursor: 'pointer'
        }}
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfilePage;