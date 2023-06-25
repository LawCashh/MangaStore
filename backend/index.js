const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const usersRouter = require('./users');

// Use the users router
app.use('/users', usersRouter);

app.use(bodyParser.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server radi na port ${PORT}`);
});

mongoose.connect('mongodb://0.0.0.0:27017/mangastore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database', error);
  });

const bcrypt = require('bcrypt');
const User = require('./models/User');

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    //TODO: error na save
    await newUser.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Error during registration', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check if the password matches
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, 'your-secret-key');

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during login', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.post('/purchases', async (req, res) => {
  try {
    const { titles, totalPrice, email } = req.body;
    // Save the purchase in the database
    // Adjust the logic as per your specific database setup
    // Example code assuming you have a Purchase model/schema
    const Purchase = require('./models/Purchase');
    const purchase = new Purchase({
      titles,
      totalPrice,
      email
    });
    await purchase.save();

    res.status(201).json({ message: 'Purchase saved successfully' });
  } catch (error) {
    console.error('Error saving purchase', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/purchases', async (req, res) => {
  try {
    // Find all purchases
    const Purchase = require('./models/Purchase');
    const purchases = await Purchase.find();

    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error retrieving purchases', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
