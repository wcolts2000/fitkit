const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../data/dbHelpers');
const auth = require('../middleware/auth');

// REGISTER NEW USER
router.post('/register', (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ err: 'Invalid Request.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  const user = {
    username,
    password: hashedPassword,
    email
  };

  db.insert(user)
    .then(userId => {
      const token = auth.generateToken({
        id: userId[0],
        username,
        password: hashedPassword,
        email
      });
      res.status(201).json({ message: `Welcome ${username}`, token });
    })
    .catch(err => {
      next(err);
    });
});

// LOGIN USER
router.post('/login', (req, res, next) => {
  const { password, email } = req.body;

  if (!password || !email) {
    return res.status(400).json({ err: 'Invalid Request' });
  }

  db.findUser(email)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = auth.generateToken(user);
        res.json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(400).json({ err: 'Invalid Credentials' });
      }
    })
    .catch(err => next(err));
});

module.exports = router;
