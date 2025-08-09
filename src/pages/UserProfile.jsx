// UserProfile.jsx
import React from 'react';
import '../styles/UserProfile.css';

const UserProfile = () => {
  // Sample data – can be replaced with real user data from backend or context
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    registeredEvents: [
      {
        id: 1,
        title: 'AI Bootcamp 2025',
        date: '2025-08-15',
        organizer: 'AI Club',
      },
      {
        id: 2,
        title: 'Cultural Fest 2025',
        date: '2025-09-01',
        organizer: 'Cultural Club',
      },
    ],
    feedbacks: [
      {
        eventTitle: 'AI Bootcamp 2025',
        comment: 'Amazing experience with hands-on sessions!',
        rating: 5,
      },
      {
        eventTitle: 'Cultural Fest 2025',
        comment: 'Fun performances and great vibe!',
        rating: 4,
      },
    ]
  };

  return (
    <div className="user-profile-container">
      <h2>My Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="user-section">
        <h3>Registered Events</h3>
        <ul>
          {user.registeredEvents.map(event => (
            <li key={event.id}>
              <strong>{event.title}</strong> - {event.date} ({event.organizer})
            </li>
          ))}
        </ul>
      </div>

      <div className="user-section">
        <h3>My Feedback</h3>
        <ul>
          {user.feedbacks.map((fb, index) => (
            <li key={index}>
              <strong>{fb.eventTitle}</strong>: "{fb.comment}" – ⭐ {fb.rating}/5
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
