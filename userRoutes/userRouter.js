const router = require('express').Router();
const bcrypt = require('bcryptjs');
const db = require('./userHelpers');
const { admin, generateToken, protected } = require('../middleware/auth');

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
      const token = generateToken({
        id: userId[0],
        username,
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

  db.findByEmail(email)
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.json({ message: `Welcome ${user.username}`, token });
      } else {
        res.status(400).json({ err: 'Invalid Credentials' });
      }
    })
    .catch(err => next(err));
});

// Update User
router.put('/:id', protected, (req, res, next) => {
  const { id } = req.params;
  const changedUser = req.body;
  // logged in users id lives on the sub key from the token they provide
  const { sub } = req.decodedToken;
  if (id != sub || !changedUser) {
    return res.status(400).json({ err: 'invalid request' });
  }

  db.findById(id)
    .then(user => {
      if (user) {
        db.updateUser(id, changedUser)
          .then(count => res.json(count))
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// Delete User
router.delete('/:id', protected, (req, res, next) => {
  const { id } = req.params;
  // users id lives on the sub key from the token they provide
  const { sub } = req.decodedToken;
  if (id != sub) {
    return res.status(401).json({ err: 'unauthorized' });
  }
  db.findById(id)
    .then(user => {
      if (user) {
        db.deleteUser(id)
          .then(count => res.json(count))
          .catch(err => next(err));
      }
    })
    .catch(err => next(err));
});

// GET ALL USERS
router.get('/', protected, admin, (req, res, next) => {
  db.getAll()
    .then(users => res.status(200).json({ users }))
    .catch(err => next(err));
});

module.exports = router;
