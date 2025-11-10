import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

const initialState = {
	cartItems: []
};

function reducer(state, action) {
	switch (action.type) {
		case 'ADD': {
			const exists = state.cartItems.find((it) => it._id === action.item._id);
			let cartItems;
			if (exists) {
				cartItems = state.cartItems.map((it) =>
					it._id === action.item._id ? { ...it, qty: it.qty + action.qty } : it
				);
			} else {
				cartItems = [...state.cartItems, { ...action.item, qty: action.qty }];
			}
			return { ...state, cartItems };
		}
		case 'REMOVE': {
			return { ...state, cartItems: state.cartItems.filter((it) => it._id !== action.id) };
		}
		case 'UPDATE_QTY': {
			return {
				...state,
				cartItems: state.cartItems.map((it) => (it._id === action.id ? { ...it, qty: action.qty } : it))
			};
		}
		case 'CLEAR': {
			return { ...state, cartItems: [] };
		}
		case 'INIT': {
			return { ...state, cartItems: action.cartItems || [] };
		}
		default:
			return state;
	}
}

export function CartProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		try {
			const saved = localStorage.getItem('cart');
			if (saved) {
				dispatch({ type: 'INIT', cartItems: JSON.parse(saved) });
			}
		} catch {}
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem('cart', JSON.stringify(state.cartItems));
		} catch {}
	}, [state.cartItems]);

	const actions = useMemo(
		() => ({
			addToCart: (item, qty) => dispatch({ type: 'ADD', item, qty }),
			removeFromCart: (id) => dispatch({ type: 'REMOVE', id }),
			updateQty: (id, qty) => dispatch({ type: 'UPDATE_QTY', id, qty }),
			clearCart: () => dispatch({ type: 'CLEAR' })
		}),
		[]
	);

	const value = { ...state, ...actions };
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
	const ctx = useContext(CartContext);
	if (!ctx) throw new Error('useCart must be used within CartProvider');
	return ctx;
}


