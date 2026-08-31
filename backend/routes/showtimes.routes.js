import { createShowtimeSchema } from '../schemas/movies.js';
import { showtimeController } from '../controllers/showtime.controller.js';
import { authMiddleware } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Showtime routes
router.get('/', authMiddleware, (req, res) => showtimeController.getAll(req, res));
router.get('/movie/:movieId', authMiddleware, (req, res) => showtimeController.getByMovie(req, res));
router.post('/', authMiddleware, authorize(['ADMIN']), (req, res) => showtimeController.create(req, res));
router.put('/:id', authMiddleware, authorize(['ADMIN']), (req, res) => showtimeController.update(req, res));
router.delete('/:id', authMiddleware, authorize(['ADMIN']), (req, res) => showtimeController.delete(req, res));

export default router;