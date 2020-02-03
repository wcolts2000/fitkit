const db = require('./configKnex');

module.exports = {
  insert: user => {
    return db('users')
      .returning('id')
      .insert(user);
  }
};
