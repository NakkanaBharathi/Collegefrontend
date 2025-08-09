import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/Clubs.css';

const ClubEvents = () => {
  const { clubName } = useParams();
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [joiningEventId, setJoiningEventId] = useState(null); // Optional: for loading state

  useEffect(() => {
    const fetchClubEvents = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/clubs/${clubName}/events`);
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
        setError('Could not load club events.');
      } finally {
        setLoading(false);
      }
    };

    fetchClubEvents();
  }, [clubName]);

  const handleJoinEvent = async (eventId) => {
    try {
      setJoiningEventId(eventId);
      const response = await fetch(`http://localhost:5000/api/events/register/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // for cookies/auth
      });

      const data = await response.json();
      alert(data.message || 'Successfully joined the event!');
    } catch (error) {
      console.error('Join error:', error);
      alert('Failed to join the event.');
    } finally {
      setJoiningEventId(null);
    }
  };

  return (
    <div className="club-events-container">
      <h2>Events by {clubName.replace(/-/g, ' ')}</h2>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : events.length === 0 ? (
        <p>No events found for this club.</p>
      ) : (
        <div className="event-cards">
          {events.map((event) => (
            <div key={event.id || event._id} className="event-card">
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {event.date}</p>
              <p><strong>Time:</strong> {event.time}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p>{event.description}</p>
              <div className="button-group">
                <button
                  onClick={() => navigate(`/event/${event.id || event._id}`, { state: event })}
                >
                  View Details
                </button>
                <button
                  onClick={() => handleJoinEvent(event.id || event._id)}
                  disabled={joiningEventId === (event.id || event._id)}
                >
                  {joiningEventId === (event.id || event._id) ? 'Joining...' : 'Join'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="back-button" onClick={() => navigate('/browse')}>
        Back to Browse Events
      </button>
    </div>
  );
};

export default ClubEvents;
