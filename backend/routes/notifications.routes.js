import { z } from 'zod';
import { notificationController } from '../controllers/notification.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Notification routes
router.post('/send-email', authMiddleware, (req, res) => notificationController.sendEmail(req, res));
router.post('/send-sms', authMiddleware, (req, res) => notificationController.sendSms(req, res));
router.post('/send-push', authMiddleware, (req, res) => notificationController.sendPushNotification(req, res));
router.post('/send-sms-reminder', authMiddleware, (req, res) => notificationController.sendSmsReminder(req, res));

export default router;