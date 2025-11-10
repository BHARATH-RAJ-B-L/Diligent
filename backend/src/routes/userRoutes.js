import { Router } from 'express';
import { body } from 'express-validator';
import { login, me, register } from '../controllers/userController.js';
import { authGuard } from '../middleware/auth.js';

const router = Router();

router.post(
	'/register',
	[body('name').notEmpty(), body('email').isEmail(), body('password').isLength({ min: 6 })],
	register
);

router.post('/login', [body('email').isEmail(), body('password').notEmpty()], login);

router.get('/me', authGuard, me);

export default router;


