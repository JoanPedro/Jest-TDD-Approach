import request from 'supertest';
import app from '../../src/app';

import truncate from '../utils/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('Should be able to register.', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Joan Pedro Oliveira de Souza',
        email: 'joan.pedro@email.com',
        password_hash: '1r12rjojf',
      });

    expect(response.body).toHaveProperty('id');
  });

  it('Should not be able to register with duplicated email.', async () => {
    await request(app)
      .post('/users')
      .send({
        name: 'Joan Pedro Oliveira de Souza',
        email: 'joan.pedro@email.com',
        password_hash: '1r12rjojf',
      });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Joan Pedro Oliveira de Souza',
        email: 'joan.pedro@email.com',
        password_hash: '1r12rjojf',
      });

    expect(response.status).toBe(400);
  });
});
