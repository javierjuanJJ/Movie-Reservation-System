import { z } from 'zod';

export const paymentIntentSchema = z.object({
  reservationId: z.string().uuid(),
  amount: z.number().positive(),
});

export const paymentConfirmSchema = z.object({
  paymentIntentId: z.string(),
  reservationId: z.string().uuid(),
});

export const paymentCancelSchema = z.object({
  paymentIntentId: z.string(),
});

export const paymentRetrieveSchema = z.object({
  paymentIntentId: z.string(),
});