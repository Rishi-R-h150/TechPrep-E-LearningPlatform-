// src/components/SignIn.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signin', {
        email,
        password,
      });
      console.log('Sign-in successful:', response.data);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.user.username);
      navigate('/home');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Don\'t have an account? Try creating one😁,Redirecting to SignUp');
        setTimeout(() => {
          navigate('/signup');
        }, 2000);
      } else {
        console.error('Error signing in:', error.response.data);
      }
    }
  };

  return (
    <div className="signin-page">
      <header className="signin-header">Get Better</header>
      <div className="signin-container">
        <h2 className="signin-title">Sign In</h2>
        {error && <div className="signin-error">{error}</div>}
        <form className="signin-form" onSubmit={handleSubmit}>
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
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
