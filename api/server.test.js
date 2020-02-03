const request = require('supertest');
const server = require('./server');

describe('server.js', () => {
  describe('root dir "/" endpoint', () => {
    it('should respond with a 200 statuscode', () => {
      const expected = 200;

      request(server)
        .get('/')
        .then(res => {
          expect(res.status).toEqual(expected);
        });
    });
    it('should respond with json', () => {
      request(server)
        .get('/')
        .then(res => {
          expect(res.type).toMatch(/json/i);
        });
    });
    it('should respond with the following json object {message: "Sanity Check"}', () => {
      const expected = { message: 'Sanity Check' };
      request(server)
        .get('/')
        .then(res => {
          expect(res.body).toEqual(expected);
        });
    });
    it('should respond with 404 status on unknown routes', () => {
      const expected = 404;
      request(server)
        .get('/unknown')
        .then(res => {
          expect(res.status).toEqual(expected);
        });
    });
  });
});
