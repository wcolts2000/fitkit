const router = require('express').Router();
const db = require('./dailyJournalHelpers');
const { protectedRoute } = require('../middleware/auth');

// ADD NEW JOURNAL ENTRY
router.post('/', protectedRoute, (req, res, next) => {
  console.log('FIRED');
  const userId = req.decodedToken.sub;
  const journal = req.body;
  journal.userId = userId;
  db.insert(journal)
    .then(journalId => {
      res.status(201).json(journalId);
    })
    .catch(err => {
      next(err);
    });
});

// GET ALL USERS JOURNALS
router.get('/', protectedRoute, (req, res, next) => {
  const id = req.decodedToken.sub;
  db.getAll(id)
    .then(usersJournals => res.status(200).json(usersJournals))
    .catch(err => next(err));
});

// GET SINGLE USER JOURNAL
router.get('/:id', protectedRoute, (req, res, next) => {
  const { id } = req.params;
  return db
    .findById(id)
    .then(userJournal => {
      if (userJournal) {
        res.status(200).json(userJournal);
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch(err => next(err));
});

// UPDATE USER JOURNAL
router.put('/:id', protectedRoute, (req, res, next) => {
  const { id } = req.params;
  const changedUserJournal = req.body;
  if (!changedUserJournal) {
    return res.status(400).json({ message: 'Invalid Request' });
  }

  db.findById(id)
    .then(userJournal => {
      if (userJournal) {
        db.updateJournal(id, changedUserJournal)
          .then(count => res.json(count))
          .catch(err => next(err));
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch(err => next(err));
});

// DELETE USER JOURNAL
router.delete('/:id', protectedRoute, (req, res, next) => {
  const { id } = req.params;
  db.findById(id)
    .then(userJournal => {
      if (userJournal) {
        db.deleteJournal(id)
          .then(count => res.json(count))
          .catch(err => next(err));
      } else {
        res.status(404).json({ message: 'Not Found' });
      }
    })
    .catch(err => next(err));
});

module.exports = router;
