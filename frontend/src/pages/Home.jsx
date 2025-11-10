import { useEffect, useState } from 'react';
import { getProducts } from '../services/api.js';
import ProductList from '../components/ProductList.jsx';
import SearchBar from '../components/SearchBar.jsx';
import Pagination from '../components/Pagination.jsx';
import demoProducts from '../data/demoProducts.js';

export default function Home() {
	const [products, setProducts] = useState([]);
	const [categories, setCategories] = useState([]);
	const [q, setQ] = useState('');
	const [category, setCategory] = useState('');
	const [page, setPage] = useState(1);
	const [pages, setPages] = useState(1);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const load = async () => {
			setLoading(true);
			setError('');
			const params = { page, limit: 12 };
			if (q) params.q = q;
			if (category) params.category = category;
			try {
				const res = await getProducts(params);
				// Support both {items,...} and {data,...} backends
				let list = res.items || res.data || [];
				// If API returned empty, show demo items for better UX
				if (!Array.isArray(list) || list.length === 0) {
					list = demoProducts;
				}
				setProducts(list);
				const totalPages = res.pagination?.pages || res.pages || 1;
				setPages(totalPages);
				const cats = Array.from(new Set(list.map((p) => p.category))).sort();
				setCategories(cats);
			} catch (e) {
				// On failure, present demo items
				setProducts(demoProducts);
				const cats = Array.from(new Set(demoProducts.map((p) => p.category))).sort();
				setCategories(cats);
				setPages(1);
				setError(e?.response?.data?.message || e.message || 'Failed to load products (showing demo items)');
			} finally {
				setLoading(false);
			}
		};
		load();
	}, [q, category, page]);

	return (
		<div>
			<div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6">
				<div className="w-full sm:w-1/2">
					<SearchBar value={q} onChange={setQ} />
				</div>
				<select value={category} onChange={(e) => setCategory(e.target.value)} className="border rounded px-3 py-2">
					<option value="">All categories</option>
					{categories.map((c) => (
						<option key={c} value={c}>
							{c}
						</option>
					))}
				</select>
			</div>
			{error ? (
				<p className="text-red-600">{error}</p>
			) : loading ? (
				<p>Loading...</p>
			) : (
				<>
					<ProductList products={products} />
					<div className="mt-6">
						<Pagination page={page} pages={pages} onPageChange={setPage} />
					</div>
				</>
			)}
		</div>
	);
}


