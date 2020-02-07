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
  describe('POST /users/register & /users/login', () => {
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
  describe('PUT /users/:id', () => {
    it('returns a 401 Unauthorized when no token is provided in headers', async () => {
      await request(server)
        .post('/users/register')
        .send(user);
      return request(server)
        .put('/users/1')
        .send({
          email: 'newemail@email.com'
        })
        .expect(401);
    });
    it('returns a 200 OK when a valid token is provided in headers', async () => {
      const userObj = await request(server)
        .post('/users/register')
        .send(user);
      return request(server)
        .put('/users/1')
        .set('Authorization', userObj.body.token)
        .send({ email: 'wcoltsy@gmail.com' })
        .expect(200);
    });
  });
  it('correctly updates the entry passed to it in the req body', async () => {
    const userObj = await request(server)
      .post('/users/register')
      .send(user);
    let updatedUser = await request(server)
      .put('/users/1')
      .set('Authorization', userObj.body.token)
      .send({ email: 'wcoltsy@gmail.com' })
      .expect(200, '1');
    expect(updatedUser.text).toBe('1');
    let newUser = await request(server)
      .get('/users/1')
      .set('Authorization', userObj.body.token)
      .expect(200);
    expect(newUser.body.email).toBe('wcoltsy@gmail.com');
    updatedUser = await request(server)
      .put('/users/1')
      .set('Authorization', userObj.body.token)
      .send({ username: 'sammy' })
      .expect(200, '1');
    newUser = await request(server)
      .get('/users/1')
      .set('Authorization', userObj.body.token)
      .expect(200);
    expect(newUser.body.username).toBe('sammy');
  });
});
