import { paymentIntentSchema, paymentConfirmSchema, paymentCancelSchema, paymentRetrieveSchema } from '../schemas/payments.js';
import stripe from '../lib/stripe.js';

export const paymentController = {
  async createIntent(req, res) {
    const result = paymentIntentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { amount, reservationId } = result.data;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { reservationId },
    });
    
    return res.json({ clientSecret: paymentIntent.client_secret });
  },

  async confirm(req, res) {
    const result = paymentConfirmSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { paymentIntentId } = result.data;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    if (paymentIntent.status === 'requires_capture') {
      await stripe.paymentIntents.confirm(paymentIntentId, {
        capture_method: 'automatic',
      });
    } else if (paymentIntent.status === 'requires_confirmation') {
      await stripe.paymentIntents.confirm(paymentIntentId);
    }
    
    return res.json({ message: 'Payment confirmed' });
  },

  async cancel(req, res) {
    const result = paymentCancelSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { paymentIntentId } = result.data;
    await stripe.paymentIntents.cancel(paymentIntentId);
    
    return res.json({ message: 'Payment cancelled' });
  },

  async retrieve(req, res) {
    const result = paymentRetrieveSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { paymentIntentId } = result.data;
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    return res.json(paymentIntent);
  },
};