import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfilePage.css';

function ProfilePage() {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(storedUser?.name || '');
  const [username, setUsername] = useState(storedUser?.username || '');
  const [email] = useState(storedUser?.email || '');
  const [profilePhoto, setProfilePhoto] = useState(storedUser?.profilePhoto || '');
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // Save to backend and localStorage
  const handleSave = async () => {
    try {
      const response = await fetch('http://localhost:8080/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          username,
          profilePhoto,
        }),
      });
      if (!response.ok) {
        setMessage('Failed to update profile.');
        return;
      }
      const updatedUser = await response.json();
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setMessage('Profile updated!');
      setEditMode(false);
    } catch (err) {
      setMessage('Error updating profile.');
    }
  };

  // Disable Save if nothing changed
  const isUnchanged =
    name === (storedUser?.name || '') &&
    username === (storedUser?.username || '') &&
    profilePhoto === (storedUser?.profilePhoto || '');

  if (!storedUser) {
    return (
      <div className="profile-not-logged-in">
        <h2>You are not logged in.</h2>
        <button onClick={() => navigate('/follow')}>Follow Others</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2 style={{ fontWeight: 700, fontSize: "2rem", marginBottom: 0 }}>Profile</h2>
      <div className="profile-photo-wrapper">
        <img
          src={profilePhoto || "https://ui-avatars.com/api/?name=" + encodeURIComponent(name)}
          alt="Profile"
          className={`profile-photo${editMode ? ' profile-photo-editable' : ''}`}
          onClick={() => {
            if (editMode && fileInputRef.current) fileInputRef.current.click();
          }}
        />
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handlePhotoChange}
          style={{ display: 'none' }}
        />
      </div>
      <form className="profile-info-form" onSubmit={e => { e.preventDefault(); if (editMode && !isUnchanged) handleSave(); }}>
        <div className="profile-field">
          <label className="profile-label">Name</label>
          {editMode ? (
            <input
              className="profile-input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          ) : (
            <div className="profile-static">{name}</div>
          )}
        </div>
        <div className="profile-field">
          <label className="profile-label">Username</label>
          {editMode ? (
            <input
              className="profile-input"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Not set"
            />
          ) : (
            <div className="profile-static">
              {username || <span className="profile-placeholder">Not set</span>}
            </div>
          )}
        </div>
        <div className="profile-field">
          <label className="profile-label">Email</label>
          <div className="profile-static">{email}</div>
        </div>
      </form>
      {message && <div className="profile-message">{message}</div>}
      {editMode ? (
        <div className="profile-btn-row">
          <button
            className="profile-btn profile-btn-save"
            onClick={handleSave}
            disabled={isUnchanged}
            style={isUnchanged ? { opacity: 0.6, cursor: "not-allowed" } : {}}
          >
            Save
          </button>
          <button className="profile-btn profile-btn-cancel" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <div className="profile-btn-row">
          <button className="profile-btn profile-btn-edit" onClick={() => setEditMode(true)}>Edit Profile</button>
          <button className="profile-btn profile-btn-logout" onClick={handleLogout}>Logout</button>
        </div>
      )}
      <button
        className="profile-btn profile-btn-follow"
        onClick={() => navigate('/follow')}
      >
        Follow Others
      </button>
      <div style={{ height: '32px' }} />
      <button
        className="profile-btn profile-btn-uploaded"
        onClick={() => navigate('/videos')}
      >
        My Videos
      </button>
    </div>
  );
}

export default ProfilePage;