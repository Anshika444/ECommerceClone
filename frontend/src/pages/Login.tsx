import React, { useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../firebase';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const existingUser = localStorage.getItem('user');
    if (existingUser) {
      navigate('/profile');
    }
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem('user', JSON.stringify({
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      }));

      navigate('/profile');
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className='login-container'>
      <h2>Login with Google</h2>
      <button onClick={handleGoogleLogin}>Sign In with Google</button>
    </div>
  );
};

export default Login;
