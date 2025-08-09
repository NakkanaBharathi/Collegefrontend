import React from 'react';
import '../styles/Clubs.css';

const ClubCard = ({ club }) => {
  return (
    <div className="club-card">
      <h3>{club.name}</h3>
      <p><strong>Mentor:</strong> {club.mentor}</p>
      <p><strong>Time:</strong> {club.time}</p>
      <p><strong>Active Members:</strong> {club.activeMembers}</p>
      <p><strong>Description:</strong> {club.description}</p>
      <p><strong>Location:</strong> {club.location}</p>
      <p><strong>Contact:</strong> {club.contact}</p>
      <button className="join-btn">Join Club</button>
    </div>
  );
};

export default ClubCard;
