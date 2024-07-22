import React, { useState } from 'react';
import axios from 'axios';
import './Authentication.css';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://doggypi-backend.onrender.com/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Save token to local storage
      onLogin(); // Notify parent component about login success
    } catch (error) {
      setError('Invalid email or password');
    }
  };

  return (
  <div className="video-container">
       <video autoPlay loop muted className="background-video">
        <source src="https://videos.pexels.com/video-files/7683638/7683638-sd_640_360_25fps.mp4" type="video/mp4" />
      </video>
    <div className="auth-page">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
  );
};

export default LoginPage;
