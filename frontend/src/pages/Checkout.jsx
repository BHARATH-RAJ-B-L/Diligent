import { useState } from 'react';
import api from '../api/client.js';
import { useCart } from '../state/CartContext.jsx';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage() {
	const { cartItems, clearCart } = useCart();
	const navigate = useNavigate();
	const [form, setForm] = useState({
		fullName: '',
		addressLine1: '',
		addressLine2: '',
		city: '',
		state: '',
		postalCode: '',
		country: ''
	});
	const [token, setToken] = useState(localStorage.getItem('token') || '');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const itemsTotal = cartItems.reduce((sum, it) => sum + it.price * it.qty, 0);
	const shippingFee = itemsTotal > 100 ? 0 : 10;
	const tax = Number((itemsTotal * 0.1).toFixed(2));
	const grandTotal = Number((itemsTotal + shippingFee + tax).toFixed(2));

	const onSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		try {
			if (!token) {
				setError('Please login to place order');
				setLoading(false);
				return;
			}
			const payload = {
				items: cartItems.map((it) => ({ productId: it._id, qty: it.qty })),
				shippingAddress: form
			};
			const res = await api.post('/api/orders', payload, {
				headers: { Authorization: `Bearer ${token}` }
			});
			if (res.status === 201) {
				clearCart();
				navigate('/');
			}
		} catch (err) {
			setError(err?.response?.data?.message || 'Failed to place order');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<form onSubmit={onSubmit} className="lg:col-span-2 space-y-3 bg-white border rounded p-4">
				<h1 className="text-xl font-semibold mb-2">Checkout</h1>
				<input
					value={form.fullName}
					onChange={(e) => setForm({ ...form, fullName: e.target.value })}
					placeholder="Full name"
					className="border rounded px-3 py-2 w-full"
					required
				/>
				<input
					value={form.addressLine1}
					onChange={(e) => setForm({ ...form, addressLine1: e.target.value })}
					placeholder="Address line 1"
					className="border rounded px-3 py-2 w-full"
					required
				/>
				<input
					value={form.addressLine2}
					onChange={(e) => setForm({ ...form, addressLine2: e.target.value })}
					placeholder="Address line 2"
					className="border rounded px-3 py-2 w-full"
				/>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<input
						value={form.city}
						onChange={(e) => setForm({ ...form, city: e.target.value })}
						placeholder="City"
						className="border rounded px-3 py-2 w-full"
						required
					/>
					<input
						value={form.state}
						onChange={(e) => setForm({ ...form, state: e.target.value })}
						placeholder="State"
						className="border rounded px-3 py-2 w-full"
						required
					/>
				</div>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
					<input
						value={form.postalCode}
						onChange={(e) => setForm({ ...form, postalCode: e.target.value })}
						placeholder="Postal code"
						className="border rounded px-3 py-2 w-full"
						required
					/>
					<input
						value={form.country}
						onChange={(e) => setForm({ ...form, country: e.target.value })}
						placeholder="Country"
						className="border rounded px-3 py-2 w-full"
						required
					/>
				</div>
				<input
					value={token}
					onChange={(e) => {
						setToken(e.target.value);
						localStorage.setItem('token', e.target.value);
					}}
					placeholder="Paste JWT token after login"
					className="border rounded px-3 py-2 w-full"
				/>
				{error && <p className="text-red-600 text-sm">{error}</p>}
				<button disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
					{loading ? 'Placing...' : 'Place Order'}
				</button>
			</form>
			<div className="bg-white border rounded p-4 h-fit">
				<h2 className="font-semibold mb-2">Summary</h2>
				<p>Items: ${itemsTotal.toFixed(2)}</p>
				<p>Shipping: ${shippingFee.toFixed(2)}</p>
				<p>Tax: ${tax.toFixed(2)}</p>
				<p className="font-semibold mt-2">Total: ${grandTotal.toFixed(2)}</p>
			</div>
		</div>
	);
}


