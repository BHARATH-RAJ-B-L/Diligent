export default function SearchBar({ value, onChange, placeholder = 'Search products...' }) {
	return (
		<input
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			className="border rounded px-3 py-2 w-full"
		/>
	);
}


