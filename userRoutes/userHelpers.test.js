const userHelper = require('./userHelpers');
const db = require('../data/configKnex');

const user = {
  username: 'test user',
  password: 'pass',
  email: 'testemail@email.com'
};

const emailString = 'testemail@email.com';

describe('User helper model', () => {
  afterEach(async () => {
    await db('users').truncate();
  });

  describe('getAll function', () => {
    it('returns a list of users', async () => {
      let userCount = await userHelper.getAll();
      expect(userCount).toBeTruthy();
    });
  });

  describe('insert function', () => {
    it('Inserts a new user into the db', async () => {
      let userCount = await db('users');
      expect(userCount).toHaveLength(0);
      await userHelper.insert(user);
      let newUserCount = await db('users');
      expect(newUserCount).toHaveLength(1);
    });
  });

  describe('findByEmail function', () => {
    it('returns a user by email address', async () => {
      await db('users').insert(user);
      let foundUser = await userHelper.findByEmail(emailString);
      expect(foundUser).toBeTruthy();
      expect(foundUser).toMatchObject(user);
    });
  });

  describe('findById', () => {
    it('returns a user by id', async () => {
      await db('users').insert(user);
      let foundUser = await userHelper.findById(1);
      expect(foundUser).toBeTruthy();
      expect(foundUser).toMatchObject(user);
    });
  });

  describe('updateUser function', () => {
    it('updates a user', async () => {
      const id = 1;
      await db('users').insert(user);
      await userHelper.updateUser(id, { username: 'mickey' });
      let updatedUser = await db('users')
        .where({ id })
        .first();
      expect(updatedUser.username).toBe('mickey');
    });
  });

  describe('deleteUser function', () => {
    it('deletes a user', async () => {
      let userCount = await db('users');
      expect(userCount).toHaveLength(0);
      await db('users').insert(user);
      userCount = await db('users');
      expect(userCount).toHaveLength(1);
      await userHelper.deleteUser(1);
      userCount = await db('users');
      expect(userCount).toHaveLength(0);
    });
  });
});
