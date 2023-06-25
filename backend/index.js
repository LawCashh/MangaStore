const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const usersRouter = require('./users');

//usersruter
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
    console.log('Povezan na bazu');
  })
  .catch((error) => {
    console.error('Greska u povezivanju na bazu', error);
  });

const bcrypt = require('bcrypt');
const User = require('./models/User');

app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // ako vec ima mail onda nista
    const postojeciKorisnik = await User.findOne({ email });
    if (postojeciKorisnik) {
      return res.status(400).json({ message: 'Mail vec registrovan' });
    }

    //dodatni sloj na sifru sa bcrypt.hash
    const hashedPassword = await bcrypt.hash(password, 10);

    // novi korisnik
    const newUser = new User({ email, password: hashedPassword });
    //TODO: error na save
    await newUser.save();

    res.status(201).json({ message: 'Registracija uspjesna' });
  } catch (error) {
    console.error('Greska u registrovanju', error);
    res.status(500).json({ message: 'Internal server error greska' });
  }
});

const jwt = require('jsonwebtoken');

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // nadji korisnika preko maila
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // provjera da li se hashovana sifra poklapa sa pravom
    const sifraTacna = await bcrypt.compare(password, user.password);
    if (!sifraTacna) {
      return res.status(401).json({ message: 'Pogresna sifra ili mail' });
    }

    // generisanje tokena
    const token = jwt.sign({ userId: user._id }, 'lmao');
    res.status(200).json({ token });
  } catch (error) {
    console.error('Greska pri loginovanju', error);
    res.status(500).json({ message: 'Internal server error greska' });
  }
});

app.post('/purchases', async (req, res) => {
  try {
    const { titles, totalPrice, email } = req.body;
    //stavljanje porudzbine u bazu
    const Purchase = require('./models/Purchase');
    const purchase = new Purchase({
      titles,
      totalPrice,
      email
    });
    await purchase.save();

    res.status(201).json({ message: 'Porudzbina uspjesno sacuvana' });
  } catch (error) {
    console.error('Greska pri kupovini', error);
    res.status(500).json({ message: 'Internal server error greska' });
  }
});

app.get('/purchases', async (req, res) => {
  try {
    //uzmi sve purchases (porudzbine) sa find()
    const Purchase = require('./models/Purchase');
    const purchases = await Purchase.find();

    res.status(200).json(purchases);
  } catch (error) {
    console.error('Greka u uzimanju porudzbina', error);
    res.status(500).json({ message: 'Internal server error greska' });
  }
});
