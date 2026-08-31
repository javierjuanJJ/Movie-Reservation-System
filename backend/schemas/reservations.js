import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']),
});

export const seatSelectionSchema = z.object({
  seats: z.array(z.object({ row: z.number(), number: z.number() })).min(1),
});