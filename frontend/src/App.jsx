import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProductPage from './pages/Product.jsx';
import CartPage from './pages/Cart.jsx';
import CheckoutPage from './pages/Checkout.jsx';
import LoginPage from './pages/Login.jsx';
import RegisterPage from './pages/Register.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
	return (
		<div className="min-h-screen flex flex-col">
			<Header />
			<main className="container mx-auto px-4 py-6 flex-1">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/product/:id" element={<ProductPage />} />
					<Route path="/cart" element={<CartPage />} />
					<Route path="/checkout" element={<CheckoutPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/register" element={<RegisterPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<Footer />
		</div>
	);
}


