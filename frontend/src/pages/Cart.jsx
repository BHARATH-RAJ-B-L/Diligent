import { Link } from 'react-router-dom';
import { useCart } from '../state/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';

export default function CartPage() {
	const { cartItems, updateQty, removeFromCart } = useCart();
	const itemsTotal = cartItems.reduce((sum, it) => sum + it.price * it.qty, 0);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<div className="lg:col-span-2">
				<h1 className="text-xl font-semibold mb-4">Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<p>Your cart is empty</p>
				) : (
					<ul className="space-y-4">{cartItems.map((it) => <CartItem key={it._id} item={it} />)}</ul>
				)}
			</div>
			<div className="bg-white border rounded p-4 h-fit">
				<p className="mb-2">Subtotal: ${itemsTotal.toFixed(2)}</p>
				<Link
					to="/checkout"
					className={`block text-center px-4 py-2 rounded text-white ${
						cartItems.length ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 pointer-events-none'
					}`}
				>
					Proceed to Checkout
				</Link>
			</div>
		</div>
	);
}


