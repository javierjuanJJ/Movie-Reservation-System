import { z } from 'zod';

export const reportSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
});