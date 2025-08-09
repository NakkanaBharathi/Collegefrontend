import React, { useEffect, useState } from 'react';
import '../styles/InfoPage.css'; // Adjust path based on your structure
const ProfilePage = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await res.json();
      setProfile(data);
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  return (
    <div className="profile-page">
      <h2>Welcome, {profile.name}</h2>
      <p>Email: {profile.email}</p>
      <p>Joined on: {profile.joinedDate}</p>
    </div>
  );
};

export default ProfilePage;
