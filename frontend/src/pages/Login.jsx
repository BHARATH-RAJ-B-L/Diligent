import { useState } from 'react';
import api from '../api/client.js';

export default function LoginPage() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const onSubmit = async (e) => {
		e.preventDefault();
		setError('');
		try {
			const res = await api.post('/api/users/login', { email, password });
			localStorage.setItem('token', res.data.token);
			alert('Login successful. Token saved to localStorage.');
		} catch (err) {
			setError(err?.response?.data?.message || 'Login failed');
		}
	};

	return (
		<form onSubmit={onSubmit} className="max-w-md mx-auto bg-white border rounded p-4 space-y-3">
			<h1 className="text-xl font-semibold">Login</h1>
			<input
				type="email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				placeholder="Email"
				className="border rounded px-3 py-2 w-full"
				required
			/>
			<input
				type="password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				placeholder="Password"
				className="border rounded px-3 py-2 w-full"
				required
			/>
			{error && <p className="text-red-600 text-sm">{error}</p>}
			<button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Login</button>
		</form>
	);
}


