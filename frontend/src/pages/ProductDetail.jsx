import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductById } from '../services/api.js';
import { useCart } from '../state/CartContext.jsx';

export default function ProductDetail() {
	const { id } = useParams();
	const [product, setProduct] = useState(null);
	const [qty, setQty] = useState(1);
	const { addToCart } = useCart();

	useEffect(() => {
		const load = async () => {
			const data = await getProductById(id);
			setProduct(data);
		};
		load();
	}, [id]);

	if (!product) return <p>Loading...</p>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
			<img src={product.imageUrl} alt={product.name} className="w-full h-80 object-cover rounded" />
			<div>
				<h1 className="text-2xl font-bold mb-2">{product.name}</h1>
				<p className="text-gray-600 mb-4">{product.description}</p>
				<p className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</p>
				<div className="flex items-center gap-3">
					<select
						value={qty}
						onChange={(e) => setQty(Number(e.target.value))}
						className="border rounded px-3 py-2"
					>
						{Array.from({ length: Math.min(10, product.countInStock || product.stock || 1) }, (_, i) => i + 1).map(
							(n) => (
								<option key={n} value={n}>
									{n}
								</option>
							)
						)}
					</select>
					<button
						onClick={() => addToCart(product, qty)}
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}


