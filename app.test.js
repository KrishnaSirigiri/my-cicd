const request = require('supertest');
const app = require('./app');

describe('API Tests', () => {
  test('GET / should return hello message', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Hello CI/CD!');
  });

  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });

  test('POST /calculate should add numbers', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({ num1: 5, num2: 3, operation: 'add' });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe(8);
  });

  test('POST /calculate should handle division by zero', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({ num1: 5, num2: 0, operation: 'divide' });
    expect(response.status).toBe(200);
    expect(response.body.result).toBe('Cannot divide by zero');
  });
});