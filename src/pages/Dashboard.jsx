import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Dashboard.css';
import EventCalendar from '../components/EventCalendar';
import axios from 'axios';

const Dashboard = () => {
  const navigate = useNavigate();
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [userInitial, setUserInitial] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setFeaturedEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/user/profile', {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const user = res.data;
        setUserInitial(user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase());
      } catch (err) {
        console.warn('Falling back to localStorage for user info');
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
          setUserInitial(user.name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase());
        }
      }
    };

    fetchEvents();
    fetchUserInfo();
  }, []);

  const handleViewDetails = (event) => {
    navigate(`/event/${event._id}`, { state: { event } });
  };

  const isPastEvent = (eventDate) => {
    return new Date(eventDate) < new Date();
  };

  return (
    <div>
      <Navbar />

      <div className="user-avatar">
        <div className="avatar-circle">{userInitial}</div>
      </div>

      <section className="hero-section">
        <h1>Discover and Join Campus Events</h1>
        <button onClick={() => navigate('/browse')}>Browse Events</button>
      </section>

      <section className="stats-section">
        <div className="stat-card">📅 Total Events: {featuredEvents.length}</div>
        <div className="stat-card">👥 Active Organizers: 8</div>
        <div className="stat-card">🔔 Upcoming Events: {
          featuredEvents.filter(event => !isPastEvent(event.date)).length
        }</div>
        <div className="stat-card">📚 Advice Posts: 5</div>
      </section>

      <section className="featured-section">
        <h2>Featured Events</h2>
        <div className="featured-events">
          {featuredEvents.map((event) => (
            <div
              className={`event-card ${isPastEvent(event.date) ? 'past-event' : ''}`}
              key={event._id}
            >
              <img
                src={`http://localhost:5000/uploads/${event.image}`}
                alt={event.title}
                className="event-image"
              />
              <h3>{event.title}</h3>
              <p><strong>Date:</strong> {new Date(event.date).toDateString()}</p>
              <p><strong>Location:</strong> {event.location}</p>
              <p><strong>Organizer:</strong> {event.organizer}</p>
              <button onClick={() => handleViewDetails(event)}>View Details</button>
              {isPastEvent(event.date) && (
                <span className="event-status past-status">Past Event</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="calendar-section">
        <h2>Event Calendar</h2>
        <div className="calendar-placeholder">
          <EventCalendar />
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Involved?</h2>
        <button onClick={() => navigate('/clubs')}>Join Clubs</button>
      </section>
    </div>
  );
};

export default Dashboard;
