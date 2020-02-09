const dailyJournalHelper = require('./dailyJournalHelpers');
const db = require('../data/configKnex');

const user = {
  username: 'test user',
  password: 'pass',
  email: 'testemail@email.com'
};

const CreateUser = async () => {
  await db('users').insert(user);
};

const journalRecord = {
  userId: 1,
  name: 'morning, before breakfast',
  weight: 234.5,
  image_url: 'https://some-url-here.com/1234dsf39_a82134asdf'
};

describe('Daily Journal helper model', () => {
  afterEach(async () => {
    await db('users').truncate();
    await db('daily_journal').truncate();
  });

  describe('insert function', () => {
    it('Inserts a new users daily journal into the db', async () => {
      await CreateUser();
      let userJournalCount = await db('daily_journal');
      expect(userJournalCount).toHaveLength(0);
      await dailyJournalHelper.insert(journalRecord);
      let newJournalCount = await db('daily_journal');
      expect(newJournalCount).toHaveLength(1);
    });
  });

  // describe('getAll function', () => {
  //   it('returns a list of users daily journals', async () => {
  //     await CreateUser();
  //     let userJournalCount = await dailyJournalHelper.getAll(1);
  //     expect(userJournalCount).toBeTruthy();
  //   });
  // });

  // describe('findById', () => {
  //   it('returns a user by id', async () => {
  //     await db('users').insert(user);
  //     let foundUser = await dailyJournalHelper.findById(1);
  //     expect(foundUser).toBeTruthy();
  //     expect(foundUser).toMatchObject(user);
  //   });
  // });

  // describe('updateUser function', () => {
  //   it('updates a user', async () => {
  //     const id = 1;
  //     await db('daily_journal').insert(user);
  //     await dailyJournalHelper.updateUser(id, { username: 'mickey' });
  //     let updatedUser = await db('users')
  //       .where({ id })
  //       .first();
  //     expect(updatedUser.username).toBe('mickey');
  //   });
  // });

  // describe('deleteUser function', () => {
  //   it('deletes a user', async () => {
  //     let userCount = await db('users');
  //     expect(userCount).toHaveLength(0);
  //     await db('users').insert(user);
  //     userCount = await db('users');
  //     expect(userCount).toHaveLength(1);
  //     await dailyJournalHelper.deleteUser(1);
  //     userCount = await db('users');
  //     expect(userCount).toHaveLength(0);
  //   });
  // });
});
