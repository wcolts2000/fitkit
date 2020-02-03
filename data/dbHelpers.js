const db = require('./configKnex');

module.exports = {
  insert: user => {
    return db('users')
      .returning('id')
      .insert(user);
  },
  findUser: email => {
    return db('users')
      .where({ email })
      .first();
  }
};
