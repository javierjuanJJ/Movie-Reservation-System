import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middlewares/error.js';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movies.routes.js';
import showtimeRoutes from './routes/showtimes.routes.js';
import reservationRoutes from './routes/reservations.routes.js';
import paymentRoutes from './routes/payments.routes.js';
import reportRoutes from './routes/reports.routes.js';
import notificationRoutes from './routes/notifications.routes.js';

const app = express();

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

// Body parsing
app.use(express.json({ limit: '10kb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/showtimes', showtimeRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/notifications', notificationRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

export { app, PORT };