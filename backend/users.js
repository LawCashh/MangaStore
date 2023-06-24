const express = require('express');
const router = express.Router();
const User = require('./models/User');

// Define the route for getting all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'email');
    res.json(users);
  } catch (error) {
    console.error('Error retrieving users', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
