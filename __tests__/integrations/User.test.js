const request = require('supertest');

const app = require('../../src/app');
const cleanup = require('../utils/cleanupTables');

describe('user', () => {
  // beforeAll(async () => {
  //   await cleanup();
  // });
  beforeEach(async () => {
    await cleanup();
  });

  it('should create an user', async () => {
    const user = {
      name: 'Jose Oswaldo',
      cpf: '11678598631',
      salary: 1600.66,
      bills: 20.0,
    };

    const response = await request(app)
      .post('/user')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('createdAt');
  });

  it('shouldnt create an user twice', async () => {
    const user = {
      name: 'Jose Oswaldo',
      cpf: '11678598631',
      salary: 1600.66,
      bills: 20.0,
    };

    await request(app)
      .post('/user')
      .send(user);

    const response = await request(app)
      .post('/user')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('shouldt create two users with same cpf', async () => {
    const firstUser = {
      name: 'Jose Oswaldo',
      cpf: '11678598631',
      salary: 1600.66,
      bills: 20.0,
    };

    await request(app)
      .post('/user')
      .send(firstUser);

    const secUser = {
      name: 'Maria Joaquina',
      cpf: '11678598631',
      salary: 2100,
      bills: 0,
    };

    const response = await request(app)
      .post('/user')
      .send(secUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
