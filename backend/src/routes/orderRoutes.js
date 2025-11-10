import { Router } from 'express';
import { body } from 'express-validator';
import { createOrder } from '../controllers/orderController.js';
import { authGuard } from '../middleware/auth.js';

const router = Router();

router.post(
	'/',
	authGuard,
	[
		body('items').isArray({ min: 1 }),
		body('shippingAddress.fullName').notEmpty(),
		body('shippingAddress.addressLine1').notEmpty(),
		body('shippingAddress.city').notEmpty(),
		body('shippingAddress.state').notEmpty(),
		body('shippingAddress.postalCode').notEmpty(),
		body('shippingAddress.country').notEmpty()
	],
	createOrder
);

export default router;


