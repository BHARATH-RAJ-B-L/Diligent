import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authGuard = async (req, res, next) => {
	try {
		const authHeader = req.headers.authorization || '';
		const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;
		if (!token) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id).select('-passwordHash');
		if (!user) {
			return res.status(401).json({ message: 'Unauthorized' });
		}
		req.user = user;
		next();
	} catch (err) {
		err.statusCode = 401;
		next(err);
	}
};

export const adminGuard = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		return next();
	}
	return res.status(403).json({ message: 'Forbidden' });
};


