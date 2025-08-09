import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import '../styles/UserDropdown.css';

const UserDropdown = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setOpen(!open);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/user/logout', {
        method: 'POST',
        credentials: 'include', // if you're using cookies
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        alert('Logged out successfully!');
        localStorage.removeItem('token'); // if you're using JWT auth
        navigate('/login');
      } else {
        alert('Failed to logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
      alert('Something went wrong');
    }
    setOpen(false);
  };

  return (
    <div className="user-icon" onClick={toggleDropdown}>
      <FaUser />
      {open && (
        <div className="profile-dropdown">
          <div onClick={() => { navigate('/profile'); setOpen(false); }}><FaUser /> My Profile</div>
          <div onClick={() => { navigate('/settings'); setOpen(false); }}><FaCog /> Settings</div>
          <div onClick={() => { navigate('/history'); setOpen(false); }}><FaHistory /> History</div>
          <div onClick={handleLogout}><FaSignOutAlt /> Logout</div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
