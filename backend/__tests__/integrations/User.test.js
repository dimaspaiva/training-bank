const request = require('supertest');

const app = require('../../src/app');
const cleanup = require('../utils/cleanupTables');
const User = require('../../src/app/models/User');

describe('user', () => {
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

  it('should update user name', async () => {
    const firstUser = {
      name: 'Jose Oswaldo',
      cpf: '11678598631',
      salary: 1600.66,
      bills: 20.0,
    };

    const user = (
      await request(app)
        .post('/user')
        .send(firstUser)
    ).body;

    const newUser = {
      name: 'Claudio Manoel',
      cpf: '11678598631',
      salary: 1660.0,
      bills: 0,
    };

    const response = await request(app)
      .put(`/user/${user.id}`)
      .send(newUser);

    expect(response.status).toBe(200);
    expect(response.body.name).not.toBe(firstUser.name);
  });

  it('shouldnt update an inexistent user', async () => {
    const user = {
      name: 'Manoel',
      cpf: '123546255',
      bills: 0,
      salary: 20000.0,
    };

    const response = await request(app)
      .put('/user/100')
      .send(user);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('shouldnt update an user with missing data', async () => {
    const firstUser = {
      name: 'Dimas Paiva',
      cpf: '11678598631',
      salary: 10,
      bills: 0,
    };

    const user = (
      await request(app)
        .post('/user')
        .send(firstUser)
    ).body;

    const newUser = {
      name: 'Dimas Antonio',
      cpf: 11144455533,
    };

    const response = await request(app)
      .put(`/user/${user.id}`)
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should decrement use bills', async () => {
    const userCreate = {
      name: 'Jose Oswaldo',
      cpf: '11678598631',
      salary: 1600.66,
      bills: 30,
    };

    const user = (
      await request(app)
        .post('/user')
        .send(userCreate)
    ).body;

    const bills = {
      newBills: 20.22,
      signal: true,
    };

    const response = await request(app)
      .patch(`/user/bills/${user.id}`)
      .send(bills);

    expect(response.status).toBe(200);
    expect(response.body.bills).toBe(9.78);
  });

  it('should pay all bills', async () => {
    const userCreate = {
      name: 'Jose Oswaldo',
      cpf: '11678598631',
      salary: 1600.66,
      bills: 30,
    };

    const user = (
      await request(app)
        .post('/user')
        .send(userCreate)
    ).body;

    const bills = {
      newBills: 30,
      signal: true,
    };

    const response = await request(app)
      .patch(`/user/bills/${user.id}`)
      .send(bills);

    expect(response.status).toBe(200);
    expect(response.body.bills).toBe(0);
  });

  it('should add user bills', async () => {
    const userCreate = {
      name: 'Jose Oswaldo',
      cpf: '11678598631',
      salary: 1600.66,
      bills: 0,
    };

    const user = (
      await request(app)
        .post('/user')
        .send(userCreate)
    ).body;

    const bills = {
      newBills: 30.0,
    };

    const response = await request(app)
      .patch(`/user/bills/${user.id}`)
      .send(bills);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('updatedAt');
  });

  it('should increment user bills', async () => {
    const userCreate = {
      name: 'Jose Oswaldo',
      cpf: '11678598631',
      salary: 1600.66,
      bills: 20,
    };

    const user = (
      await request(app)
        .post('/user')
        .send(userCreate)
    ).body;

    const bills = {
      newBills: 30.3,
    };

    const response = await request(app)
      .patch(`/user/bills/${user.id}`)
      .send(bills);

    expect(response.status).toBe(200);
    expect(response.body.bills).toBe(50.3);
  });

  it('shouldnt increment inexistent user', async () => {
    const bills = {
      newBills: 30,
    };

    const response = await request(app)
      .patch(`/user/bills/${100}`)
      .send(bills);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('shouldnt decrement to lower then zeri', async () => {
    const userCreate = {
      name: 'Jose Oswaldo',
      cpf: '11678598631',
      salary: 1600.66,
      bills: 20,
    };

    const user = (
      await request(app)
        .post('/user')
        .send(userCreate)
    ).body;

    const bills = {
      newBills: 30.3,
      signal: true,
    };

    const response = await request(app)
      .patch(`/user/bills/${user.id}`)
      .send(bills);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
