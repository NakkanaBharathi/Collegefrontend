import React, { useState } from 'react';
import '../styles/Auth.css';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || data.msg || 'Invalid credentials');
      } else {
        if (data.token && data.user) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user));
          navigate('/dashboard');
        } else {
          alert('Unexpected server response. Please try again.');
        }
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Redirect to backend OAuth routes on clicking social buttons
  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/google'; // Adjust to your backend Google OAuth route
  };

  const handleGithubLogin = () => {
    window.location.href = 'http://localhost:5000/api/auth/github'; // Adjust to your backend GitHub OAuth route
  };

  return (
    <div className="auth-container">
      <h2 className="auth-title">Welcome Back!</h2>
      <p className="auth-subtitle">Login to continue</p>

      <input
        type="email"
        placeholder="Email"
        className="auth-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="auth-input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="auth-btn" onClick={handleLogin} disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>

      <div className="auth-divider">OR</div>

      <button className="auth-social google" onClick={handleGoogleLogin}>
        <FcGoogle className="auth-icon" /> Login with Google
      </button>

      <button className="auth-social github" onClick={handleGithubLogin}>
        <FaGithub className="auth-icon" /> Login with GitHub
      </button>

      <p className="auth-switch">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
