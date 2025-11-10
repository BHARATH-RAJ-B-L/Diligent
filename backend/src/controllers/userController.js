import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import User from '../models/User.js';

const signToken = (user) => {
	return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

export const register = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		const { name, email, password } = req.body;
		const exists = await User.findOne({ email });
		if (exists) {
			return res.status(400).json({ message: 'Email already in use' });
		}
		const passwordHash = await User.hashPassword(password);
		const user = await User.create({ name, email, passwordHash });
		const token = signToken(user);
		res.status(201).json({
			user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
			token
		});
	} catch (err) {
		next(err);
	}
};

export const login = async (req, res, next) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
		 return res.status(400).json({ errors: errors.array() });
		}
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		const ok = await user.comparePassword(password);
		if (!ok) {
			return res.status(401).json({ message: 'Invalid credentials' });
		}
		const token = signToken(user);
		res.json({
			user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin },
			token
		});
	} catch (err) {
		next(err);
	}
};

export const me = async (req, res) => {
	res.json({
		id: req.user._id,
		name: req.user.name,
		email: req.user.email,
		isAdmin: req.user.isAdmin
	});
};


