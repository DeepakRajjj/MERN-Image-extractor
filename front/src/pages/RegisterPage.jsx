import React, { useState } from 'react';
import axios from 'axios';
import './Authentication.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://doggypi-backend.onrender.com/api/auth/register', { email, password });
      alert('Registration successful! You can now log in.');
    } catch (error) {
      setError('Error registering. Please try again.');
    }
  };

  return (
    <div className="video-container">
    <video autoPlay loop muted className="background-video">
     <source src="https://videos.pexels.com/video-files/7683638/7683638-sd_640_360_25fps.mp4" type="video/mp4" />
   </video>
    <div className="auth-page">
      <h1>Register</h1>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Register</button>
      </form>
    </div>
    </div>
  );
};

export default RegisterPage;
