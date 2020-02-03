const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('../data/dbHelpers');
const auth = require('../middleware/auth');

// REGISTER NEW USER
router.post('/register', (req, res, next) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res.status(400).json({ err: 'invalid request.' });
  }

  const hashedPassword = bcrypt.hashSync(password, 12);
  const user = {
    username,
    password: hashedPassword,
    email
  };
  console.log(`\nUSER: ${JSON.stringify(user)} \n`);

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

module.exports = router;
