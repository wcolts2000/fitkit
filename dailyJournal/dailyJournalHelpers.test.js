const dailyJournalHelper = require('./dailyJournalHelpers');
const db = require('../data/configKnex');

const user = {
  username: 'test user',
  password: 'pass',
  email: 'testemail@email.com'
};

const journalRecord = {
  userId: 1,
  entry: 'Today was good.',
  weight: 234.5,
  image_url: 'https://some-url-here.com/1234dsf39_a82134asdf'
};

const CreateUser = async () => {
  await db('users').insert(user);
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

  describe('getAll function', () => {
    it('returns a list of users daily journals', async () => {
      await CreateUser();
      let userJournalCount = await dailyJournalHelper.getAll(1);
      expect(userJournalCount).toBeTruthy();
    });
  });

  describe('findById', () => {
    it('returns a users journal by id', async () => {
      await db('users').insert(user);
      await db('daily_journal')
        .where({ id: 1 })
        .insert(journalRecord);
      let foundJournal = await dailyJournalHelper.findById(1);
      expect(foundJournal).toBeTruthy();
    });
  });

  describe('updateJournal function', () => {
    it('updates a users journal', async () => {
      await db('users').insert(user);
      await db('daily_journal')
        .where({ id: 1 })
        .insert(journalRecord);
      await dailyJournalHelper.updateJournal(1, { entry: 'today was great' });
      let updatedJournal = await db('daily_journal')
        .where({ id: 1 })
        .first();
      expect(updatedJournal.entry).toBe('today was great');
    });
  });

  describe('deleteJournal function', () => {
    it('deletes a users journal', async () => {
      let userJournalCount = await db('daily_journal');
      expect(userJournalCount).toHaveLength(0);
      await db('users').insert(user);
      await db('daily_journal')
        .where({ id: 1 })
        .insert(journalRecord);
      userJournalCount = await db('daily_journal');
      expect(userJournalCount).toHaveLength(1);
      await dailyJournalHelper.deleteJournal(1);
      userJournalCount = await db('daily_journal');
      expect(userJournalCount).toHaveLength(0);
    });
  });
});
