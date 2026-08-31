import { paymentIntentSchema, paymentConfirmSchema } from '../schemas/payments.js';
import { paymentController } from '../controllers/payments.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Payment routes
router.post('/create-intent', authMiddleware, (req, res) => paymentController.createIntent(req, res));
router.post('/confirm', authMiddleware, (req, res) => paymentController.confirm(req, res));

export default router;