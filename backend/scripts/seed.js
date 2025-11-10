import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import connectDB from '../config/db.js';
import Product from '../src/models/Product.js';
import User from '../src/models/User.js';

dotenv.config();

async function run() {
	try {
		await connectDB();
		const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
		let admin = await User.findOne({ email: adminEmail });
		if (!admin) {
			const passwordHash = await User.hashPassword(process.env.SEED_ADMIN_PASSWORD || 'Admin@123');
			admin = await User.create({ name: 'Admin', email: adminEmail, passwordHash, isAdmin: true });
		}
		const file = path.join(process.cwd(), 'backend', 'data', 'products.json');
		const raw = fs.readFileSync(file, 'utf-8');
		const sample = JSON.parse(raw);
		await Product.deleteMany({});
		await Product.insertMany(
			sample.map((p) => ({
				...p,
				countInStock: p.stock ?? 0,
				imageUrl: p.imageUrl || (p.images && p.images[0]) || ''
			}))
		);
		console.log('Seeded products successfully');
		process.exit(0);
	} catch (err) {
		console.error(err);
		process.exit(1);
	}
}

run();


