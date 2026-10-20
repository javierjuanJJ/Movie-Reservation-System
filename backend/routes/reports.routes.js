import { reportController } from '../controllers/reports.controller.js';
import { authMiddleware, authorize } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Report routes (Admin only)
router.get('/all-reservations', authMiddleware, authorize(['ADMIN']), (req, res) => reportController.getAllReservations(req, res));
router.get('/revenue', authMiddleware, authorize(['ADMIN']), (req, res) => reportController.getRevenue(req, res));

export default router;
