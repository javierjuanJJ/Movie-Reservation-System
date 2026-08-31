import { signupSchema, loginSchema } from '../schemas/movies.js';
import { movieSchema, partialMovieSchema } from '../schemas/movies.js';
import { authController } from '../controllers/auth.controller.js';
import { authorize } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Auth routes (no auth required)
router.post('/signup', (req, res) => authController.signup(req, res));
router.post('/login', (req, res) => authController.login(req, res));
router.get('/me', authMiddleware, (req, res) => authController.me(req, res));
router.post('/promote', authMiddleware, authorize(['ADMIN']), (req, res) => authController.promote(req, res));

// Movie routes (Admin only)
router.post('/', authMiddleware, authorize(['ADMIN']), (req, res) => movieController.create(req, res));
router.get('/', authMiddleware, (req, res) => movieController.getAll(req, res));
router.get('/:id', authMiddleware, (req, res) => movieController.getOne(req, res));
router.put('/:id', authMiddleware, authorize(['ADMIN']), (req, res) => movieController.update(req, res));
router.delete('/:id', authMiddleware, authorize(['ADMIN']), (req, res) => movieController.delete(req, res));

export default router;