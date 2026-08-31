import { z } from 'zod';
import { movieSchema, partialMovieSchema, reservationSchema } from '../schemas/movies.js';
import { movieController } from '../controllers/movies.controller.js';
import { reservationController } from '../controllers/reservations.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Movie routes
router.get('/', authMiddleware, (req, res) => movieController.getAll(req, res));
router.get('/:id', authMiddleware, (req, res) => movieController.getOne(req, res));
router.post('/', authMiddleware, authorize(['ADMIN']), (req, res) => movieController.create(req, res));
router.put('/:id', authMiddleware, authorize(['ADMIN']), (req, res) => movieController.update(req, res));
router.delete('/:id', authMiddleware, authorize(['ADMIN']), (req, res) => movieController.delete(req, res));

// Reservation routes
router.get('/', authMiddleware, (req, res) => reservationController.getAll(req, res));
router.post('/', authMiddleware, (req, res) => reservationController.create(req, res));
router.post('/:id/cancel', authMiddleware, (req, res) => reservationController.cancel(req, res));

export default router;