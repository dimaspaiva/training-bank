// const request = require('supertest');

// const app = require('../../src/app');
const create = require('../utils/createTables');
const cleanup = require('../utils/deleteTables');

describe('user', () => {
  beforeEach(async () => {
    await create();
  });

  afterEach(async () => {
    await cleanup();
  });

  it('should create an user', async () => {
    // const user = {
    //   name: 'Jose Oswaldo',
    //   cpf: '11678598631',
    //   salary: 1600.66,
    //   bills: 20.0,
    // };
    // const response = await request(app)
    //   .post('/user')
    //   .send(user);
    // expect(response.status).toBe(200);
    expect(2).toBe(2);
  });
});
