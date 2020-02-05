const request = require('supertest');
const server = require('../api/server');
const db = require('../data/configKnex');

const user = {
  username: 'test user',
  password: 'pass',
  email: 'testemail@email.com'
};

const loginCreds = {
  password: 'pass',
  email: 'testemail@email.com'
};

describe('user auth router', () => {
  beforeEach(async () => {
    await db('users').truncate();
  });
  describe('New user Register and login', () => {
    it('should return 201 status and token when sent a POST to /users/register ', async () => {
      const expected = 201;
      let res = await request(server)
        .post('/users/register')
        .send(user);
      const token = res.body.token;

      expect(res.status).toEqual(expected);
      expect(token).not.toBe(undefined);
    });
    it('should return a 200 status and token when a valid user logs in via POST to /users/login', async () => {
      const expected = 200;

      let res = await request(server)
        .post('/users/register')
        .send(user);

      res = await request(server)
        .post('/users/login')
        .send(loginCreds);
      const token = res.body.token;

      expect(res.status).toEqual(expected);
      expect(token).not.toBe(undefined);
    });
  });
});
