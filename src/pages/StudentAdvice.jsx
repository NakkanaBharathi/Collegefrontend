import React, { useState } from 'react';
import '../styles/StudentAdvice.css';

const StudentAdvice = () => {
  const [adviceList, setAdviceList] = useState([
    {
      id: 1,
      author: 'Campus Advisor',
      content: 'Get involved in clubs to build leadership and network.',
      timestamp: '2025-07-26 10:30',
      type: 'official',
    },
    {
      id: 2,
      author: 'Campus Career Cell',
      content: 'Start internships by your second year to explore your field early.',
      timestamp: '2025-07-25 16:00',
      type: 'official',
    },
    {
      id: 3,
      author: 'Aarav Singh',
      content: 'Make a study group for hard subjects. It helps a lot!',
      timestamp: '2025-07-24 18:45',
      type: 'student',
    },
  ]);

  const [newAdvice, setNewAdvice] = useState('');
  const [studentName, setStudentName] = useState('');

  const handlePost = () => {
    if (newAdvice.trim() && studentName.trim()) {
      const newEntry = {
        id: adviceList.length + 1,
        author: studentName,
        content: newAdvice,
        timestamp: new Date().toLocaleString(),
        type: 'student',
      };
      setAdviceList([newEntry, ...adviceList]);
      setNewAdvice('');
      setStudentName('');
    }
  };

  return (
    <div className="advice-container">
      <h2 className="advice-title">💡 Student & Campus Advice Board</h2>

      <div className="advice-form">
        <input
          type="text"
          placeholder="Your Name"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
        />
        <textarea
          placeholder="Share your advice or tips..."
          value={newAdvice}
          onChange={(e) => setNewAdvice(e.target.value)}
        ></textarea>
        <button onClick={handlePost}>Post Advice</button>
      </div>

      <div className="advice-list">
        {adviceList.map((advice) => (
          <div
            key={advice.id}
            className={`advice-card ${advice.type === 'official' ? 'official' : 'student'}`}
          >
            <div className="advice-meta">
              <strong>{advice.author}</strong>
              <span>{advice.timestamp}</span>
            </div>
            <p className="advice-content">{advice.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentAdvice;
