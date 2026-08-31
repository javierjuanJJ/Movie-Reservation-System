import { reservationSchema } from '../schemas/movies.js';

export const reservationController = {
  async getAll(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json([]);
  },

  async create(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const result = reservationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    return res.status(201).json(result.data);
  },

  async cancel(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const { reservationId } = req.params;
    return res.json({ message: 'Reservation cancelled', reservationId });
  },
};