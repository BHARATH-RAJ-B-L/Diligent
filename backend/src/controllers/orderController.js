import { validationResult } from 'express-validator';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const createOrder = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { items, shippingAddress } = req.body;
		if (!items || !Array.isArray(items) || items.length === 0) {
			return res.status(400).json({ message: 'No order items' });
		}
		// Validate products and compute totals
		let itemsTotal = 0;
		const fullItems = [];
		for (const it of items) {
			const product = await Product.findById(it.productId);
			if (!product || !product.isActive) {
				return res.status(400).json({ message: 'Invalid product' });
			}
			if (product.countInStock < it.qty) {
				return res.status(400).json({ message: 'Insufficient stock' });
			}
			const lineTotal = product.price * it.qty;
			itemsTotal += lineTotal;
			fullItems.push({
				product: product._id,
				name: product.name,
				imageUrl: product.imageUrl,
				price: product.price,
				qty: it.qty
			});
		}
		const shippingFee = itemsTotal > 100 ? 0 : 10;
		const tax = Number((itemsTotal * 0.1).toFixed(2));
		const grandTotal = Number((itemsTotal + shippingFee + tax).toFixed(2));

		const order = await Order.create({
			user: req.user._id,
			items: fullItems,
			shippingAddress,
			itemsTotal,
			shippingFee,
			tax,
			grandTotal
		});
		res.status(201).json(order);
	} catch (err) {
		next(err);
	}
};


