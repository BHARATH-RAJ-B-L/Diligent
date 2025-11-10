import { Link } from 'react-router-dom';
import { useCart } from '../state/CartContext.jsx';

export default function ProductCard({ product }) {
	const { addToCart } = useCart();
	return (
		<div className="bg-white border rounded-lg overflow-hidden flex flex-col">
			<Link to={`/product/${product._id}`}>
				<img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover" />
			</Link>
			<div className="p-4 flex-1 flex flex-col">
				<Link to={`/product/${product._id}`} className="font-semibold mb-2">
					{product.name}
				</Link>
				<p className="text-gray-600 text-sm flex-1">{product.description}</p>
				<div className="mt-3 flex items-center justify-between">
					<span className="text-lg font-bold">${product.price.toFixed(2)}</span>
					<button
						onClick={() => addToCart(product, 1)}
						className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
					>
						Add to cart
					</button>
				</div>
			</div>
		</div>
	);
}


