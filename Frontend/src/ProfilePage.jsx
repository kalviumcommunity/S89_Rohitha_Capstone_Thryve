import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const handleSave = async () => {
    try {
      const res = await axios.put('http://localhost:8080/user/profile', {
        email,
        name,
        username,
        profilePhoto,
      });
      localStorage.setItem('user', JSON.stringify(res.data));
      setMessage('Profile updated!');
      setEditMode(false);
    } catch (err) {
      setMessage('Update failed.');
    }
  };

  if (!storedUser) {
    return (
      <div className="profile-not-logged-in">
        <h2>You are not logged in.</h2>
        <button onClick={() => navigate('/')}>Go Home</button>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h2>👤 Profile</h2>
      <div className="profile-info">
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
        <div>
          <b>Name:</b>{' '}
          {editMode ? (
            <input className="profile-input" value={name} onChange={e => setName(e.target.value)} />
          ) : (
            name
          )}
        </div>
        <div>
          <b>Username:</b>{' '}
          {editMode ? (
            <input className="profile-input" value={username} onChange={e => setUsername(e.target.value)} />
          ) : (
            username || <span className="profile-placeholder">Not set</span>
          )}
        </div>
        <div><b>Email:</b> {email}</div>
      </div>
      {message && <div className="profile-message">{message}</div>}
      {editMode ? (
        <div className="profile-btn-row">
          <button className="profile-btn profile-btn-save" onClick={handleSave}>Save</button>
          <button className="profile-btn profile-btn-cancel" onClick={() => setEditMode(false)}>Cancel</button>
        </div>
      ) : (
        <button className="profile-btn profile-btn-edit" onClick={() => setEditMode(true)}>Edit Profile</button>
      )}
      <button className="profile-btn profile-btn-logout" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default ProfilePage;