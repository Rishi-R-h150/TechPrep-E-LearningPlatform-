// src/components/SignUp.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'; // Import the CSS file

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        username,
        email,
        password,
      });
      console.log('Sign-up successful:', response.data);
      navigate('/signin'); // Redirect to sign-in page after successful sign-up
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("User already exists. Try signing in.");
        setTimeout(() => {
          navigate('/signin');
        }, 2000);
      } else {
        console.error('Error signing up:', error.response.data);
      }
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-header">Get Better</div>
      <div className="signup-container">
        <h2 className="signup-title">Sign Up</h2>
        {error && <div className="signup-error">{error}</div>}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
