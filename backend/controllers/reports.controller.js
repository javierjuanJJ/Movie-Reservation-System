import { reportSchema } from '../schemas/reports.js';

export const reportController = {
  async getAllReservations(req, res) {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin only' });
    }
    return res.json([]); // Would aggregate all reservations
  },

  async getRevenue(req, res) {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin only' });
    }
    return res.json({ revenue: 0 }); // Would calculate real revenue
  },
};