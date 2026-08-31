import { paymentIntentSchema, paymentConfirmSchema } from '../schemas/payments.js';

export const paymentController = {
  async createIntent(req, res) {
    const result = paymentIntentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { amount } = result.data;
    const paymentIntent = { id: `pi_${Date.now()}`, amount };
    return res.json(paymentIntent);
  },

  async confirm(req, res) {
    const result = paymentConfirmSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    return res.json({ message: 'Payment confirmed' });
  },
};