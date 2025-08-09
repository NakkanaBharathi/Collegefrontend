// FeedbackList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FeedbackForm.css';

const FeedbackList = ({ eventId }) => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/feedback/${eventId}`);
        setFeedback(res.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchFeedback();
    }
  }, [eventId]);

  if (loading) return <p>Loading feedback...</p>;

  if (!feedback || feedback.length === 0) {
    return <p className="no-feedback">No feedback yet. Be the first to share your experience!</p>;
  }

  return (
    <div className="feedback-list">
      <h3>Feedback & Reviews</h3>
      {feedback.map((fb, index) => (
        <div key={index} className="feedback-card">
          <div className="feedback-header">
            <span className="user-icon">👤</span>
            <strong>{fb.username || 'Anonymous'}</strong>
          </div>
          <p className="feedback-comment">"{fb.comment}"</p>
          <div className="feedback-rating">⭐ {fb.rating}/5</div>
        </div>
      ))}
    </div>
  );
};

export default FeedbackList;
