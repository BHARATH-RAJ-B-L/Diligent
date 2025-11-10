import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './utils/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import seedRoutes from './routes/seedRoutes.js';

dotenv.config();

const app = express();

// Security & middlewares
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
		credentials: true
	})
);
app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

// Health
app.get('/api/health', (req, res) => {
	res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// Root
app.get('/', (req, res) => {
	res.send('E-commerce API running...');
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seed', seedRoutes);

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	const status = err.statusCode || 500;
	res.status(status).json({
		message: err.message || 'Internal Server Error'
	});
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'test') {
	connectDB()
		.then(() => {
			app.listen(PORT, () => {
				console.log(`API running on port ${PORT}`);
			});
		})
		.catch((err) => {
			console.error('Failed to connect DB', err);
			process.exit(1);
		});
}

export default app;


