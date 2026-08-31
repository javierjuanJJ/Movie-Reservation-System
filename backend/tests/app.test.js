import { test } from 'node:test';
import assert from 'node:assert';
import app from '../app.js';

test('GET /health should return status ok', async () => {
  const response = await app.inject({
    method: 'GET',
    url: '/health',
  });
  
  assert.strictEqual(response.statusCode, 200);
  const body = JSON.parse(response.text);
  assert.strictEqual(body.status, 'ok');
});

test('POST /api/auth/signup should return 400 for invalid data', async () => {
  const response = await app.inject({
    method: 'POST',
    url: '/api/auth/signup',
    body: { invalid: 'data' },
    headers: { 'Content-Type': 'application/json' },
  });
  
  assert.strictEqual(response.statusCode, 400);
});