import request from 'supertest';
import app from '../../src/app';

describe('User', () => {
  it('Should be able to register', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Joan Pedro Oliveira de Souza',
        email: 'joan.pedro@email.com',
        password_hash: '1r12rjojf',
      });

    expect(response.body).toHaveProperty('id');
  });
});
