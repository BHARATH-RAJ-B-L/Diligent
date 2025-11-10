import { useCart } from '../state/CartContext.jsx';

export default function CartItem({ item }) {
	const { updateQty, removeFromCart } = useCart();
	return (
		<li className="flex items-center gap-4 bg-white border rounded p-3">
			<img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded" />
			<div className="flex-1">
				<p className="font-medium">{item.name}</p>
				<p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
			</div>
			<select
				value={item.qty}
				onChange={(e) => updateQty(item._id, Number(e.target.value))}
				className="border rounded px-2 py-1"
			>
				{Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
					<option key={n} value={n}>
						{n}
					</option>
				))}
			</select>
			<button className="text-red-600" onClick={() => removeFromCart(item._id)}>
				Remove
			</button>
		</li>
	);
}


