import { createShowtimeSchema } from '../schemas/movies.js';

export const showtimeController = {
  async getAll(req, res) {
    return res.json([]); // Would call ShowtimeModel.findAll()
  },

  async getByMovie(req, res) {
    return res.json([]); // Would call ShowtimeModel.findByMovie(req.params.movieId)
  },

  async create(req, res) {
    const result = createShowtimeSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    return res.status(201).json(result.data);
  },

  async update(req, res) {
    const result = createShowtimeSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    return res.json(result.data);
  },

  async delete(req, res) {
    return res.status(204).end();
  },
};
