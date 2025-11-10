import Product from '../models/Product.js';
import mongoose from 'mongoose';

export const listProducts = async (req, res, next) => {
	try {
		const { q, category, minPrice, maxPrice, page = 1, limit = 12 } = req.query;
		const filter = { isActive: true };
		if (q) {
			filter.name = { $regex: q, $options: 'i' };
		}
		if (category) {
			filter.category = category;
		}
		if (minPrice || maxPrice) {
			filter.price = {};
			if (minPrice) filter.price.$gte = Number(minPrice);
			if (maxPrice) filter.price.$lte = Number(maxPrice);
		}
		const skip = (Number(page) - 1) * Number(limit);
		const [items, total] = await Promise.all([
			Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
			Product.countDocuments(filter)
		]);
		res.json({
			items,
			pagination: { total, page: Number(page), pages: Math.ceil(total / Number(limit)) }
		});
	} catch (err) {
		next(err);
	}
};

export const getProductById = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({ message: 'Invalid product id' });
		}
		const product = await Product.findById(id);
		if (!product) {
			return res.status(404).json({ message: 'Product not found' });
		}
		res.json(product);
	} catch (err) {
		next(err);
	}
};

export const createOrSeedProducts = async (req, res, next) => {
	try {
		const body = req.body;
		if (Array.isArray(body)) {
			const inserted = await Product.insertMany(
				body.map((p) => ({
					...p,
					countInStock: p.stock ?? p.countInStock ?? 0,
					stock: p.stock ?? p.countInStock ?? 0,
					imageUrl: p.imageUrl || (p.images && p.images[0]) || ''
				}))
			);
			return res.status(201).json({ message: 'Seeded products', count: inserted.length });
		}
		const created = await Product.create({
			...body,
			countInStock: body.stock ?? body.countInStock ?? 0,
			stock: body.stock ?? body.countInStock ?? 0,
			imageUrl: body.imageUrl || (body.images && body.images[0]) || ''
		});
		return res.status(201).json(created);
	} catch (err) {
		next(err);
	}
};

export const updateProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
			return res.status(400).json({ message: 'Invalid product id' });
		}
		const update = { ...req.body };
		if (update.stock != null) update.countInStock = update.stock;
		if (!update.imageUrl && Array.isArray(update.images) && update.images.length) {
			update.imageUrl = update.images[0];
		}
		const updated = await Product.findByIdAndUpdate(id, update, { new: true });
		if (!updated) return res.status(404).json({ message: 'Product not found' });
		res.json(updated);
	} catch (err) {
		next(err);
	}
};

export const deleteProduct = async (req, res, next) => {
	try {
		const { id } = req.params;
		if (!mongoose.isValidObjectId(id)) {
		 return res.status(400).json({ message: 'Invalid product id' });
		}
		const deleted = await Product.findByIdAndDelete(id);
		if (!deleted) return res.status(404).json({ message: 'Product not found' });
		res.json({ message: 'Deleted' });
	} catch (err) {
		next(err);
	}
};


