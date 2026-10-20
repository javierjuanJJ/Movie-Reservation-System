import { authController } from '../controllers/auth.controller.js';
import { authMiddleware, authorize } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Auth routes (no auth required)
router.post('/signup', (req, res) => authController.signup(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.get('/me', authMiddleware, (req, res) => authController.me(req, res));
router.post('/promote', authMiddleware, authorize(['ADMIN']), (req, res) => authController.promote(req, res));

export default router;
