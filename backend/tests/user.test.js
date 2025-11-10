import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/server.js';

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	process.env.MONGODB_URI = uri;
	process.env.JWT_SECRET = 'testsecret';
	await mongoose.connect(uri);
});

afterAll(async () => {
	await mongoose.disconnect();
	if (mongoServer) await mongoServer.stop();
});

describe('Users API', () => {
	test('Register -> Login -> Me', async () => {
		const registerRes = await request(app).post('/api/users/register').send({
			name: 'John',
			email: 'john@example.com',
			password: 'secret123'
		});
		expect(registerRes.statusCode).toBe(201);
		const loginRes = await request(app).post('/api/users/login').send({
			email: 'john@example.com',
			password: 'secret123'
		});
		expect(loginRes.statusCode).toBe(200);
		const token = loginRes.body.token;
		const meRes = await request(app).get('/api/users/me').set('Authorization', `Bearer ${token}`);
		expect(meRes.statusCode).toBe(200);
		expect(meRes.body.email).toBe('john@example.com');
	});
});


