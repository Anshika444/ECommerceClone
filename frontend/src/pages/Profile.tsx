import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Or loading spinner
  }

  return (
    <div className='profile-container'>
      <img src={user.photo} alt="Profile" style={{ borderRadius: '50%', width: '100px' }} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>

      <button onClick={() => {
        localStorage.removeItem('user');
        navigate('/');
      }}>Logout</button>
    </div>
  );
};

export default Profile;
