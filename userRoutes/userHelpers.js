const db = require('../data/configKnex');

module.exports = {
  getAll: () => {
    return db('users');
  },
  insert: user => {
    return db('users')
      .returning('id')
      .insert(user);
  },
  findByEmail: email => {
    return db('users')
      .where({ email })
      .first();
  },
  findById: id => {
    return db('users')
      .where({ id })
      .first();
  },
  updateUser: (id, changedUser) => {
    return db('users')
      .where({ id })
      .update(changedUser);
  },
  deleteUser: id => {
    return db('users')
      .where({ id })
      .del();
  },
  db
};
