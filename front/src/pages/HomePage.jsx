import React from 'react';
import './HomePage.css';
const HomePage = () => {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="background-video">
        <source src="https://videos.pexels.com/video-files/7683638/7683638-sd_640_360_25fps.mp4" type="video/mp4" />
      </video>
      <div className="overlay">
        <h1>Welcome to the Dog Image App!! DoggyPI</h1>
      </div>
    </div>
  );
};

export default HomePage;
