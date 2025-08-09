import React from 'react';
import '../styles/Clubs.css';

const StatCard = ({ label, count }) => {
  return (
    <div className="stat-card">
      <h3>{label}</h3>
      <p>{count}</p>
    </div>
  );
};

export default StatCard;
