import { Router } from 'express';
import { body } from 'express-validator';
import {
	createOrSeedProducts,
	deleteProduct,
	getProductById,
	listProducts,
	updateProduct
} from '../src/controllers/productController.js';
import { adminGuard, authGuard } from '../src/middleware/auth.js';

const router = Router();

router.get('/', listProducts);
router.get('/:id', getProductById);

router.post(
	'/',
	authGuard,
	adminGuard,
	[
		body().custom((val) => typeof val === 'object'),
		body('name').optional().notEmpty(),
		body('price').optional().isNumeric(),
		body('stock').optional().isInt({ min: 0 })
	],
	createOrSeedProducts
);

router.put('/:id', authGuard, adminGuard, updateProduct);
router.delete('/:id', authGuard, adminGuard, deleteProduct);

export default router;


