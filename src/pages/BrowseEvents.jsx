import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/BrowseEvents.css';

const BrowseEvents = () => {
  const [eventsData, setEventsData] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [date, setDate] = useState('');
  const [filterTab, setFilterTab] = useState('upcoming');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const today = new Date();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) throw new Error('Failed to fetch events');
        const data = await response.json();
        setEventsData(data);
      } catch (err) {
        console.error(err);
        setError('Failed to load events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = async (eventId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/events/register/${eventId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // include cookies if using session auth
      });

      const data = await response.json();

      if (response.ok) {
        // Show success message only when registration is successful
        alert(data.message || 'Registered successfully!');
      } else {
        // Show error message if registration failed
        alert(data.message || 'Registration failed.');
      }
    } catch (error) {
      console.error('Register error:', error);
      alert('Registration failed due to a network or server error.');
    }
  };

  const filteredEvents = eventsData.filter((event) => {
    const eventDate = new Date(event.date);
    const isUpcoming = eventDate >= today;
    const isPast = eventDate < today;

    const matchesTab = filterTab === 'upcoming' ? isUpcoming : isPast;
    const matchesSearch = event.title?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? event.tags?.includes(category) : true;
    const matchesOrganizer = organizer ? event.organizer === organizer : true;
    const matchesDate = date ? new Date(event.date).toISOString().split('T')[0] === date : true;

    return matchesTab && matchesSearch && matchesCategory && matchesOrganizer && matchesDate;
  });

  const handleClear = () => {
    setSearch('');
    setCategory('');
    setOrganizer('');
    setDate('');
  };

  const handleViewDetails = (event) => {
    navigate(`/event-details/${event._id}`);
  };

  return (
    <div className="browse-events">
      <h2>Browse Events</h2>

      <div className="filters">
        <input
          type="text"
          placeholder="Search events..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Technology">Technology</option>
          <option value="Culture">Culture</option>
          <option value="Music">Music</option>
          <option value="Art">Art</option>
          <option value="Business">Business</option>
        </select>
        <select value={organizer} onChange={(e) => setOrganizer(e.target.value)}>
          <option value="">All Organizers</option>
          {[...new Set(eventsData.map((e) => e.organizer))].map((org) => (
            <option key={org} value={org}>{org}</option>
          ))}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button className="apply-btn">Apply Filters</button>
        <button className="clear-btn" onClick={handleClear}>Clear</button>
      </div>

      <div className="tabs">
        <button
          onClick={() => setFilterTab('upcoming')}
          className={filterTab === 'upcoming' ? 'active' : ''}
        >
          Upcoming Events
        </button>
        <button
          onClick={() => setFilterTab('past')}
          className={filterTab === 'past' ? 'active' : ''}
        >
          Past Events
        </button>
      </div>

      {loading ? (
        <p>Loading events...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="event-list">
          {filteredEvents.length === 0 ? (
            <p className="no-events">No events found.</p>
          ) : (
            filteredEvents.map((event) => {
              const registeredPercent = event.capacity
                ? Math.round(((event.registeredUsers?.length || 0) / event.capacity) * 100)
                : 0;

              const isFull = registeredPercent >= 100;
              const eventDate = new Date(event.date);
              const isPast = eventDate < today;
              const isRegistrationClosed = isFull || isPast;

              return (
                <div key={event._id} className="event-card">
                  <img
                    src={event.image ? `http://localhost:5000/uploads/${event.image}` : '/default-image.jpg'}
                    alt={event.title}
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  />
                  <div className="event-info">
                    <h3>{event.title}</h3>
                    <p>📅 {new Date(event.date).toLocaleDateString()} | 🕒 {event.time}</p>
                    <p>📍 {event.location}</p>
                    <p>👤 {event.organizer}</p>
                    <div className="progress-bar">
                      <div className="fill" style={{ width: `${registeredPercent}%` }}></div>
                    </div>
                    <p className="registered-text">{registeredPercent}% Registered</p>
                    <div className="btns">
                      <button onClick={() => handleViewDetails(event)}>View Details</button>
                      <button
                        className={`register-btn ${isRegistrationClosed ? 'closed' : ''}`}
                        onClick={() => handleRegister(event._id)}
                        disabled={isRegistrationClosed}
                      >
                        {isPast ? 'Registration Closed' : isFull ? 'Full' : 'Register Now'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default BrowseEvents;
