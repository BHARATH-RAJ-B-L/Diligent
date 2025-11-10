import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../src/server.js';
import Product from '../src/models/Product.js';

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();
	process.env.MONGODB_URI = uri;
	await mongoose.connect(uri);
});

afterAll(async () => {
	await mongoose.disconnect();
	if (mongoServer) await mongoServer.stop();
});

describe('Products API', () => {
	beforeEach(async () => {
		await Product.deleteMany({});
		await Product.create({
			name: 'Test Product',
			description: 'Desc',
			price: 10,
			category: 'Cat',
			countInStock: 5
		});
	});

	test('GET /api/products returns list', async () => {
		const res = await request(app).get('/api/products');
		expect(res.statusCode).toBe(200);
		expect(res.body.items.length).toBe(1);
	});
});


