import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Components.css';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef();

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
  }, [darkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigate = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    // Optionally clear auth tokens
    navigate('/login');
  };

  return (
    <nav className={`navbar ${darkMode ? 'navbar-dark' : ''}`}>
      <div className="navbar-logo" onClick={() => handleNavigate('/dashboard')}>
        CampusEvents
      </div>

      <div className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/browse" className={location.pathname === '/browse' ? 'active' : ''}>Events</Link>
        <Link to="/student-advice" className={location.pathname === '/student-advice' ? 'active' : ''}>Student Advice</Link>
        <Link to="/clubs" className={location.pathname === '/clubs' ? 'active' : ''}>Clubs</Link>
      </div>

      <div className="navbar-right">
        {/* Profile Dropdown */}
        <div className="user-icon" title="Profile" onClick={() => setProfileOpen(!profileOpen)} ref={profileRef}>
          👤
          {profileOpen && (
            <div className="profile-dropdown">
              <div onClick={() => handleNavigate('/profile')}>My Profile</div>
              <div onClick={() => handleNavigate('/settings')}>Settings</div>
              <div onClick={() => handleNavigate('/history')}>History</div>
              <div onClick={handleLogout}>Logout</div>
            </div>
          )}
        </div>

        <div className="dark-toggle">
          <label className="switch">
            <input type="checkbox" onChange={() => setDarkMode(!darkMode)} />
            <span className="slider round"></span>
          </label>
        </div>

        <div className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
