import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import BrowseEvents from '../pages/BrowseEvents';
import EventDetails from '../pages/EventDetails';
import JoinClubs from '../pages/JoinClubs';
import StudentAdvice from '../pages/StudentAdvice'; // ✅ correct
import ProfilePage from '../pages/ProfilePage';
import SettingsPage from '../pages/SettingsPage';
import HistoryPage from '../pages/HistoryPage';
import UserDropdown from '../components/UserDropdown'; // ✅ correct
import axios from 'axios';
import RegistrationForm from '../pages/RegistrationForm';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchEvents = () => API.get('/events');
export const createEvent = (eventData) => API.post('/events', eventData);
export const getEventById = (id) => API.get(`/events/${id}`);


const AppRouter = () => (
  <Routes>
    <Route path="/" element={<Welcome />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/browse" element={<BrowseEvents />} />
    <Route path="/event-details/:id" element={<EventDetails />} />
    <Route path="/student-advice" element={<StudentAdvice />} />
    <Route path="/clubs" element={<JoinClubs />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/settings" element={<SettingsPage />} />
    <Route path="/history" element={<HistoryPage />} />
    <Route path="/user-dropdown" element={<UserDropdown />} />
    <Route path="/event/:id" element={<EventDetails />} />
    <Route path="/register/:id" element={<RegistrationForm />} />

  </Routes>
);

export default AppRouter;