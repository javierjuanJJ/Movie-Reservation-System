import { reservationController } from '../controllers/reservations.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Reservation routes
router.get('/', authMiddleware, (req, res) => reservationController.getAll(req, res));
router.post('/', authMiddleware, (req, res) => reservationController.create(req, res));
router.post('/:reservationId/cancel', authMiddleware, (req, res) => reservationController.cancel(req, res));

export default router;
