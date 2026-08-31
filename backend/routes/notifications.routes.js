import { z } from 'zod';
import { notificationController } from '../controllers/notification.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Notification routes (User protected for email, Admin for some)
router.post('/send-email', authMiddleware, (req, res) => notificationController.sendEmail(req, res));
router.post('/send-sms', authMiddleware, (req, res) => notificationController.sendSms(req, res));

export default router;