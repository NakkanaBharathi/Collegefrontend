import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/EventDetails.css';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaEnvelope } from 'react-icons/fa';

const BACKEND_URL = 'http://localhost:5000';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [registeredCount, setRegisteredCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/events/${id}`);
        if (!res.ok) throw new Error('Event not found');
        const data = await res.json();
        setEvent(data);
        setRegisteredCount(data.registered || 0);
      } catch (err) {
        setError('Unable to load event details.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleFeedbackSubmit = () => {
    if (!feedback.trim()) return;
    alert('✅ Feedback submitted!');
    setFeedback('');
    setRating(5);
  };

  if (loading) return <p className="loading-text">Loading event details...</p>;

  if (error || !event) {
    return (
      <div className="event-details-error">
        <h2>{error || 'Event not found'}</h2>
        <button onClick={() => navigate('/')}>Go Back</button>
      </div>
    );
  }

  const totalCapacity = event.capacity || 200;
  const percentage = Math.min((registeredCount / totalCapacity) * 100, 100).toFixed(1);
  const imageUrl = event.image?.startsWith('http')
    ? event.image
    : `${BACKEND_URL}/uploads/${event.image}`;

  return (
    <div className="event-details-page">
      <div className="event-details-container">
        <h2>{event.title}</h2>
        <img src={imageUrl} alt={event.title} className="event-details-image" />

        <div className="event-info-box">
          <p><strong><FaCalendarAlt /> Date:</strong> {event.date}</p>
          <p><strong><FaClock /> Time:</strong> {event.time || '10:00 AM'}</p>
          <p><strong><FaMapMarkerAlt /> Location:</strong> {event.location}</p>
          <p><strong><FaUser /> Organizer:</strong> {event.organizer}</p>
          <p><strong><FaEnvelope /> Contact:</strong> {event.contact}</p>

          <p><strong>Description:</strong> {event.description}</p>
          <p><strong>Registered:</strong> {registeredCount} / {totalCapacity}</p>
          <p><strong>Rating:</strong> ⭐ {event.rating || '4.5'} / 5</p>

          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
            <span className="percentage-label">{percentage}% Full</span>
          </div>
        </div>

        <div className="buttons">
          {/* Register button navigates to the registration form */}
          <button onClick={() => navigate(`/register/${id}`)}>Register</button>
          <button onClick={() => navigate('/browse')}>Back</button>
        </div>

        <div className="feedback-section">
          <h3>Leave Feedback</h3>
          <label>
            Rating:
            <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </label>
          <textarea
            value={feedback}
            placeholder="Your comments..."
            onChange={(e) => setFeedback(e.target.value)}
          />
          <button onClick={handleFeedbackSubmit}>Submit Feedback</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
