const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');

beforeAll(async () => {
  await db.migrate.rollback();
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

describe('[POST] /api/auth/register', () => {
  test('responds with a status 201', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'Irvin', password: '123' });
    expect(res.status).toBe(201);
  });
  test('resolves a new user in the db', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({ username: 'John', password: '123' });
    expect(res.body).toMatchObject({ id: 2, username: 'John' });
  });
});

describe('[POST] /api/auth/login', () => {
  beforeEach(async () => {
    await request(server)
      .post('/api/auth/register')
      .send({ username: 'Irvin', password: '123' });
  });
  test('responds with status 200 upon successful login', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Irvin', password: '123' });
    expect(res.status).toBe(200);
  });
  test('responds with welcome message upon login', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({ username: 'Irvin', password: '123' });
    expect(res.body).toMatchObject({ message: 'welcome, Irvin' });
  });
});
