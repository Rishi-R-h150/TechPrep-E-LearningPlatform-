// src/components/Home.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import ProgressBar from "@ramonak/react-progress-bar";
import './HomePage.css';

const Home = () => {
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/signin'); // Redirect to sign-in if no token found
      }

      try {
        const response = await axios.get('http://localhost:5000/api/home', {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
          },
        });
        setMessage(response.data.message);
        setUsername(localStorage.getItem('username'));
      } catch (error) {
        console.error('Error fetching protected data:', error);
        navigate('/signin'); // Redirect if token is invalid or expired
      }
    };

    fetchData();
  }, [navigate]);

  return (
    <div>
      <h1 className='hero-title'>Welcome, {username || 'User'}!</h1>
      <div className="testimoniall">
        <p className="testimoniall-text">
          "It always seems impossible until it's done."
        </p>
        <h4 className="testimoniall-author">- Nelson Mandela</h4>
        <ProgressBar
        completed={80}
        className="wrapper"
        barContainerClassName="container"
        completedClassName="barCompleted"
        labelClassName="label"
      />
      </div>
      <div className="dot-lottie-container">
        <DotLottieReact
          src="https://lottie.host/e35b1e3f-25b6-488c-8e50-42f4dfcf00e3/jFyqzcw2kH.lottie"
          loop
          autoplay
        />
      </div>
    </div>
  );
};

export default Home;
