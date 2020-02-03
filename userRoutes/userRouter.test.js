const request = require('supertest');
const server = require('../api/server');

describe('user auth router', () => {
  describe('Registering New user', () => {
    it('POST TO /users/register should return 201 status', async () => {
      const expected = 201;
      const user = {
        username: 'test user',
        password: 'pass',
        email: 'testemail@email.com'
      };
      let res = await request(server)
        .post('/users/register')
        .send(user);

      expect(res.status).toEqual(expected);
    });
  });
});
