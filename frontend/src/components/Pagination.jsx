export default function Pagination({ page, pages, onPageChange }) {
	if (!pages || pages <= 1) return null;
	const items = Array.from({ length: pages }, (_, i) => i + 1);
	return (
		<div className="flex flex-wrap gap-2">
			{items.map((p) => (
				<button
					key={p}
					onClick={() => onPageChange(p)}
					className={`px-3 py-1 border rounded ${p === page ? 'bg-blue-600 text-white' : 'bg-white'}`}
				>
					{p}
				</button>
			))}
		</div>
	);
}


