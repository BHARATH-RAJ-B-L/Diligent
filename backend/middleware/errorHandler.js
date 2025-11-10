// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
	const status = err.statusCode || 500;
	res.status(status).json({
		message: err.message || 'Internal Server Error'
	});
}


