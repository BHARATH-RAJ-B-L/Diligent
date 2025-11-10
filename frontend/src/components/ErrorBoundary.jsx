import { Component } from 'react';

export default class ErrorBoundary extends Component {
	constructor(props) {
		super(props);
		this.state = { hasError: false, error: null };
	}
	static getDerivedStateFromError(error) {
		return { hasError: true, error };
	}
	componentDidCatch(error, info) {
		console.error('ErrorBoundary caught an error:', error, info);
	}
	render() {
		if (this.state.hasError) {
			return (
				<div className="p-6">
					<h1 className="text-xl font-bold mb-2">Something went wrong.</h1>
					<p className="text-red-600 text-sm">{String(this.state.error)}</p>
				</div>
			);
		}
		return this.props.children;
	}
}


