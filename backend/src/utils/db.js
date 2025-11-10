import mongoose from 'mongoose';

const connectDB = async () => {
	const raw = process.env.MONGODB_URI || '';
	const mongoUri = raw.trim();
	if (!mongoUri) {
		throw new Error('MONGODB_URI is not set');
	}
	if (/\s/.test(mongoUri)) {
		throw new Error('MONGODB_URI contains whitespace. Remove spaces from the connection string.');
	}
	mongoose.set('strictQuery', true);
	await mongoose.connect(mongoUri, {
		dbName: process.env.MONGODB_DB_NAME || undefined
	});
	console.log('MongoDB connected');
};

export default connectDB;


