import { movieController } from '../controllers/movies.controller.js';
import { authMiddleware, authorize } from '../middlewares/auth.js';

const router = (await import('express')).Router();

// Movie routes
router.get('/', authMiddleware, (req, res) => movieController.getAll(req, res));
router.get('/:id', authMiddleware, (req, res) => movieController.getOne(req, res));
router.post('/', authMiddleware, authorize(['ADMIN']), (req, res) => movieController.create(req, res));
router.put('/:id', authMiddleware, authorize(['ADMIN']), (req, res) => movieController.update(req, res));
router.delete('/:id', authMiddleware, authorize(['ADMIN']), (req, res) => movieController.delete(req, res));

export default router;
