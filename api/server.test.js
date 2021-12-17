const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');
const bcrypt = require('bcryptjs');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe('[POST] /api/auth/register', () => {
  test('responds with a status 201', async () => {
    const hash = bcrypt.hashSync('123', 8);
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Irvin', password: hash });
    expect(res.status).toBe(201);
  });
  test('resolves a new user in the db', async () => {
    const hash = bcrypt.hashSync('123', 8);
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'John', password: hash });
    expect(res.body).toMatchObject({ id: 2, username: 'John' });
  });
});
