const request = require('supertest');
const express = require('express');

const errorHandler = require('../../src/errorhandler/500');
const handle404 = require('../../src/errorhandler/404');

const app = express();

// Routes
app.get('/api/data', (req, res) => {
  throw new Error('Something went wrong');
});

app.use(handle404);
app.use(errorHandler);

describe('Error handling', () => {
  it('should handle 404 errors', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Sorry, we could not find what you were looking for');
  });

  it('should handle 500 errors', async () => {
    const response = await request(app).get('/api/data');
    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Something went wrong');
  });
});
