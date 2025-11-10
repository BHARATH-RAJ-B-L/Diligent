import axios from 'axios';

const rawBase =
	import.meta.env.VITE_API_BASE_URL || import.meta.env.REACT_APP_API_URL || 'http://localhost:5000';
const baseURL = rawBase.replace(/\/+$/, '');

const client = axios.create({ baseURL });

export const setAuthToken = (token) => {
	if (token) client.defaults.headers.common.Authorization = `Bearer ${token}`;
	else delete client.defaults.headers.common.Authorization;
};

export const getProducts = async (params) => {
	const res = await client.get('/api/products', { params });
	return res.data;
};

export const getProductById = async (id) => {
	const res = await client.get(`/api/products/${id}`);
	return res.data;
};

export const register = async (payload) => {
	const res = await client.post('/api/auth/register', payload);
	return res.data;
};

export const login = async (payload) => {
	const res = await client.post('/api/auth/login', payload);
	return res.data;
};

export const createOrder = async (payload, token) => {
	const res = await client.post('/api/orders', payload, {
		headers: token ? { Authorization: `Bearer ${token}` } : undefined
	});
	return res.data;
};

export default client;


