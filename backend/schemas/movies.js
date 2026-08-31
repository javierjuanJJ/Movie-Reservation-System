import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const movieSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  poster: z.string().url('Invalid poster URL').optional(),
  genre: z.string().optional(),
});

export const partialMovieSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().optional(),
  poster: z.string().url().optional(),
  genre: z.string().optional(),
});

export const reservationSchema = z.object({
  showtimeId: z.string().uuid('Invalid showtime ID'),
  seats: z.array(z.object({ row: z.number(), number: z.number() })).min(1, 'Select at least one seat'),
});

export const partialReservationSchema = z.object({
  showtimeId: z.string().uuid().optional(),
  seats: z.array(z.object({ row: z.number(), number: z.number() })).optional(),
});

export const createShowtimeSchema = z.object({
  movieId: z.string().uuid('Invalid movie ID'),
  hall: z.string().min(1, 'Hall is required'),
  date: z.date(),
  price: z.number().positive('Price must be positive'),
});

export const reservationCancellationSchema = z.object({
  reservationId: z.string().uuid('Invalid reservation ID'),
});