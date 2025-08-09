import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Clubs.css'; // use your existing CSS or modify as needed

const JoinClubs = () => {
  const [clubs, setClubs] = useState([]);
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All Clubs');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState(null);
  const [joinData, setJoinData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/clubs');
        setClubs(response.data);
        setFilteredClubs(response.data);
      } catch (error) {
        alert('Failed to fetch clubs');
      }
    };
    fetchClubs();
  }, []);

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'All Clubs') {
      setFilteredClubs(clubs);
    } else {
      setFilteredClubs(
        clubs.filter(
          (club) => club.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  // Open join modal with selected club
  const openJoinModal = (club) => {
    setSelectedClub(club);
    setJoinData({ name: '', email: '', message: '' });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClub(null);
  };

  // Handle form input change
  const handleChange = (e) => {
    setJoinData({ ...joinData, [e.target.name]: e.target.value });
  };

  // Submit join form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!joinData.name || !joinData.email) {
      alert('Please fill name and email');
      return;
    }
    setLoading(true);
    try {
      // Example POST request to backend join route - adapt URL & body as needed
      await axios.post('http://localhost:5000/api/clubs/join', {
        clubId: selectedClub._id,
        ...joinData,
      });
      alert(`Joined ${selectedClub.name} successfully!`);
      closeModal();
    } catch (error) {
      alert('Failed to join club. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="join-clubs-container">
      <h2 className="heading">Join a Club</h2>

      <div className="search-section">
        <div className="categories">
          {['All Clubs', 'Academic', 'Cultural', 'Sports', 'Technical', 'Social'].map(
            (cat) => (
              <button
                key={cat}
                onClick={() => filterByCategory(cat)}
                className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            )
          )}
        </div>
      </div>

      <div className="clubs-grid">
        {filteredClubs.length ? (
          filteredClubs.map((club) => (
            <div key={club._id} className="club-card">
              <img
                src={
                  club.imageUrl?.startsWith('http')
                    ? club.imageUrl
                    : `http://localhost:5000${club.imageUrl}`
                }
                alt={club.name}
              />
              <h3>{club.name}</h3>
              <p><strong>Mentor:</strong> {club.coordinator}</p>
              <p><strong>Category:</strong> {club.category}</p>
              <p><strong>Contact:</strong> {club.contact}</p>
              <p><strong>Description:</strong> {club.description}</p>
              <p>
                <strong>Website:</strong>{' '}
                {club.socialLinks?.website ? (
                  <a href={club.socialLinks.website} target="_blank" rel="noopener noreferrer">
                    {club.socialLinks.website}
                  </a>
                ) : 'N/A'}
              </p>
              <p>
                <strong>Instagram:</strong>{' '}
                {club.socialLinks?.instagram ? (
                  <a href={club.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                    {club.socialLinks.instagram}
                  </a>
                ) : 'N/A'}
              </p>

              <button className="join-btn" onClick={() => openJoinModal(club)}>
                Join
              </button>
            </div>
          ))
        ) : (
          <p>No clubs found in "{selectedCategory}" category.</p>
        )}
      </div>

      {/* Modal for Join Form */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            <h3>Join {selectedClub.name}</h3>
            <form onSubmit={handleSubmit}>
              <label>
                Your Name*:
                <input
                  type="text"
                  name="name"
                  value={joinData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Your Email*:
                <input
                  type="email"
                  name="email"
                  value={joinData.email}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Message:
                <textarea
                  name="message"
                  value={joinData.message}
                  onChange={handleChange}
                  placeholder="Optional message..."
                />
              </label>

              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? 'Joining...' : 'Submit'}
                </button>
                <button type="button" onClick={closeModal} className="cancel-btn">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinClubs;
