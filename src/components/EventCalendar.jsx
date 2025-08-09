// src/components/EventCalendar.jsx
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/EventCalendar.css';

const EventCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [events, setEvents] = useState({});

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/calendar-events', {
          credentials: 'include',
        });
        const data = await response.json();

        // Build a map: date → array of events
        const eventMap = {};
        data.forEach((event) => {
          const dateKey = new Date(event.date).toISOString().split('T')[0];
          if (!eventMap[dateKey]) eventMap[dateKey] = [];
          eventMap[dateKey].push({ title: event.title, id: event._id || event.id });
        });

        setEvents(eventMap);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleJoin = async (eventId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/calendar-events/register/${eventId}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        }
      );
      const result = await response.json();
      alert(result.message || 'Joined event successfully!');
    } catch (error) {
      console.error('Join error:', error);
      alert('Failed to join the event.');
    }
  };

  // Render any number of events in a tile
  const tileContent = ({ date, view }) => {
    const key = date.toISOString().split('T')[0];
    const dayEvents = events[key];
    if (view !== 'month' || !dayEvents) return null;

    return (
      <div className="event-indicator">
        {dayEvents.map((ev, idx) => (
          <div key={idx} className="tile-event">
            <div className="tile-title">{ev.title}</div>
            <button
              className="join-btn small"
              onClick={() => handleJoin(ev.id)}
            >
              Join
            </button>
          </div>
        ))}
      </div>
    );
  };

  // List events for the clicked date
  const selectedKey = selectedDate.toISOString().split('T')[0];
  const selectedEvents = events[selectedKey] || [];

  return (
    <div className="calendar-container">
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileContent={tileContent}
      />

      <div className="selected-event-details">
        <h3>Events on {selectedKey}</h3>
        {selectedEvents.length > 0 ? (
          selectedEvents.map((ev) => (
            <div key={ev.id} className="event-card">
              <h4>{ev.title}</h4>
              <button onClick={() => handleJoin(ev.id)}>Join</button>
              {/* Example: add a View Details button when you build that page */}
              {/* <button onClick={() => navigate(`/event/${ev.id}`)}>View Details</button> */}
            </div>
          ))
        ) : (
          <p>No events on this day.</p>
        )}
      </div>
    </div>
  );
};

export default EventCalendar;
