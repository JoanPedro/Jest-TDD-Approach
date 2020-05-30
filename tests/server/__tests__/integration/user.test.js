import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';

import factory from '../factory-girl';
import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Sould encrypt user password when new user created.', async () => {
    const user = await factory.create('User', {
      password: '1r12rjojf', // Como é uma comparação de senha, não deixar o factory
      // gerar uma senha aleatória.
    });

    const compareHash = await bcrypt.compare('1r12rjojf', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('Should be able to register.', async () => {
    const user = await factory.attrs('User'); // Retorna atributos aleatórios do Model

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to register with duplicated email.', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
