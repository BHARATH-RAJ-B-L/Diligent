import ProductCard from './ProductCard.jsx';

export default function ProductList({ products }) {
	if (!products?.length) {
		return <p>No products found.</p>;
	}
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{products.map((p) => (
				<ProductCard key={p._id} product={p} />
			))}
		</div>
	);
}


