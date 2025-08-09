import React, { useEffect, useState } from 'react';
import '../styles/InfoPage.css';

const BACKEND_URL = 'http://localhost:5000/api/user';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    setLoading(true);
    setError('');

    fetch(`${BACKEND_URL}/history`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // add token header if required by backend
      },
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch history');
        return res.json();
      })
      .then(data => setHistory(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  if (loading) return <p>Loading history...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="history-container">
      <h2>Activity History</h2>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              {item.activity || item.event || 'Activity'} —{' '}
              {item.timestamp
                ? new Date(item.timestamp).toLocaleString()
                : item.date
                ? new Date(item.date).toLocaleString()
                : 'Date unknown'}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default HistoryPage;
