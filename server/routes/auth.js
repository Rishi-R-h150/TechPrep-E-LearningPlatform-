// server/routes/auth.js
const express = require('express');
const User = require('../models/UserModel/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware')

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const user = new User({ username, email, password });
    await user.save();

    
    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '5h' });
    res.status(201).json({ token, user: { id: user._id, username: user.username, email } });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user' });
    console.error("Error creating user:", error);
  }
});


router.post('/signin', async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
     
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
    
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      
      const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '5h' });
      res.json({ token, user: { id: user._id, username: user.username, email } });
    } catch (error) {
      res.status(500).json({ message: 'Error logging in' });
      console.log(`The error during login ${error}`)
    }
  });
  

  router.get('/profile', protect, (req, res) => {
    res.json({ message: 'This is a protected route', userId: req.user.id });
  });


  module.exports = router;