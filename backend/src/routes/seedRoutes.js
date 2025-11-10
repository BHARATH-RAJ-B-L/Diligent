import { Router } from 'express';
import User from '../models/User.js';
import Product from '../models/Product.js';

const router = Router();

router.post('/products', async (req, res, next) => {
	try {
		// Ensure admin user exists
		const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@example.com';
		let adminUser = await User.findOne({ email: adminEmail });
		if (!adminUser) {
			const passwordHash = await User.hashPassword(process.env.SEED_ADMIN_PASSWORD || 'Admin@123');
			adminUser = await User.create({
				name: 'Admin',
				email: adminEmail,
				passwordHash,
				isAdmin: true
			});
		}
		// Seed products
		const count = await Product.countDocuments();
		if (count > 0) {
			return res.json({ message: 'Products already seeded', count });
		}
		const sample = [
			{
				name: 'Classic Tee',
				description: 'Soft cotton t-shirt',
				price: 19.99,
				category: 'Apparel',
				brand: 'Diligent',
				imageUrl: 'https://via.placeholder.com/400x300',
				countInStock: 50
			},
			{
				name: 'Wireless Headphones',
				description: 'Noise cancelling over-ear headphones',
				price: 129.99,
				category: 'Electronics',
				brand: 'Diligent',
				imageUrl: 'https://via.placeholder.com/400x300',
				countInStock: 20
			},
			{
				name: 'Water Bottle',
				description: 'Insulated stainless steel bottle',
				price: 24.99,
				category: 'Accessories',
				brand: 'Diligent',
				imageUrl: 'https://via.placeholder.com/400x300',
				countInStock: 100
			}
		];
		const inserted = await Product.insertMany(sample);
		res.status(201).json({ message: 'Seeded products', count: inserted.length });
	} catch (err) {
		next(err);
	}
});

export default router;


