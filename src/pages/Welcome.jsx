import React from 'react';
import '../styles/Welcome.css';

const Welcome = () => {
  return (
    <div className="welcome-container">
      <h1 className="welcome-title">Welcome to Campus Events</h1>
      <p className="welcome-subtitle">
        Discover, Join, and Manage Campus Events with Ease.
      </p>
      <button className="get-started-btn" onClick={() => window.location.href = "/login"}>
        Get Started
      </button>
    </div>
  );
};

export default Welcome;
