import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../state/CartContext.jsx';

export default function Header() {
	const { cartItems } = useCart();
	const count = cartItems.reduce((sum, it) => sum + it.qty, 0);
	return (
		<header className="bg-white border-b">
			<div className="container mx-auto px-4 py-4 flex items-center justify-between">
				<Link to="/" className="text-xl font-bold">
					Diligent Shop
				</Link>
				<nav className="flex gap-4 items-center">
					<NavLink to="/" className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
						Home
					</NavLink>
					<NavLink to="/cart" className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
						Cart ({count})
					</NavLink>
					<NavLink to="/login" className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
						Login
					</NavLink>
					<NavLink to="/register" className={({ isActive }) => (isActive ? 'font-semibold' : '')}>
						Register
					</NavLink>
				</nav>
			</div>
		</header>
	);
}


