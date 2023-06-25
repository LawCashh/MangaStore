const express = require('express');
const router = express.Router();
const User = require('./models/User');

//ruta za uzimanje korisnika, treba mi na postman
router.get('/', async (req, res) => {
  try {
    const users = await User.find({}, 'email');
    res.json(users);
  } catch (error) {
    console.error('Greska u uzimanju korisnika', error);
    res.status(500).json({ message: 'Internal server error greska' });
  }
});

module.exports = router;
