import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import User from '../../src/app/models/User';

import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Sould encrypt user password when new user created.', async () => {
    const user = await User.create({
      name: 'Joan Pedro Oliveira de Souza',
      email: 'joan.pedro@email.com',
      password: '1r12rjojf',
    });

    const compareHash = await bcrypt.compare('1r12rjojf', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('Should be able to register.', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Joan Pedro Oliveira de Souza',
        email: 'joan.pedro@email.com',
        password: '1r12rjojf',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to register with duplicated email.', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Joan Pedro Oliveira de Souza',
        email: 'joan.pedro@email.com',
        password: '1r12rjojf',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Joan Pedro Oliveira de Souza',
        email: 'joan.pedro@email.com',
        password: '1r12rjojf',
      });

    expect(response.status).toBe(400);
  });
});
