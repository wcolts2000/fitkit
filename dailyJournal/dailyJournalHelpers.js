const db = require('../data/configKnex');

module.exports = {
  insert: (journalEntry, userId) => {
    return db('daily_journal')
      .where({ userId })
      .returning('id')
      .insert(journalEntry);
  },
  getAll: userId => {
    return db('daily_journal').where({ userId });
  },
  findById: id => {
    return db('daily_journal')
      .where({ id })
      .first();
  },
  updateJournal: (id, updatedJournal) => {
    return db('daily_journal')
      .where({ id })
      .update(updatedJournal);
  },
  deleteJournal: id => {
    return db('daily_journal')
      .where({ id })
      .del();
  }
};
