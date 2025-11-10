import mongoose from 'mongoose';

export default async function connectDB() {
	const raw = process.env.MONGODB_URI || '';
	const uri = raw.trim();
	if (!uri) {
		throw new Error('MONGODB_URI is not set');
	}
	if (/\s/.test(uri)) {
		throw new Error('MONGODB_URI contains whitespace. Remove spaces from the connection string.');
	}
	mongoose.set('strictQuery', true);
	await mongoose.connect(uri, {
		dbName: process.env.MONGODB_DB_NAME || undefined
	});
	console.log('MongoDB connected');
}


