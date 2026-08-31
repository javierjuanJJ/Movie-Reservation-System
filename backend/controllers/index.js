import { z } from 'zod';
import UserModel from '../models/user.model.js';
import MovieModel from '../models/movie.model.js';
import ShowtimeModel from '../models/showtime.model.js';
import ReservationModel from '../models/reservation.model.js';

export const authController = {
  async signup(req, res) {
    const result = UserSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { email, password, name } = result.data;
    const user = await UserModel.create({ email, password, name, role: 'USER' });
    
    return res.status(201).json({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
  },

  async login(req, res) {
    const result = LoginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { email, password } = result.data;
    const user = await UserModel.findByEmail(email);
    
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // In a real app, would generate JWT here
    return res.json({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
  },

  async me(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json({ 
      id: req.user.id, 
      email: req.user.email, 
      role: req.user.role 
    });
  },

  async promote(req, res) {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only admins can promote users' });
    }
    
    const { userId } = req.params;
    const user = await UserModel.update(userId, 'ADMIN');
    
    return res.json({ 
      id: user.id, 
      email: user.email, 
      role: user.role 
    });
  },
};

export const movieController = {
  async getAll(req, res) {
    const movies = await MovieModel.findAll();
    return res.json(movies);
  },

  async create(req, res) {
    const result = MovieSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const movie = await MovieModel.create(result.data);
    return res.status(201).json(movie);
  },

  async getOne(req, res) {
    const movie = await MovieModel.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.json(movie);
  },

  async update(req, res) {
    const result = partialMovieSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const movie = await MovieModel.update(req.params.id, result.data);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.json(movie);
  },

  async delete(req, res) {
    const movie = await MovieModel.delete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    return res.status(204).end();
  },
};

export const showtimeController = {
  async getAll(req, res) {
    const showtimes = await ShowtimeModel.findAll();
    return res.json(showtimes);
  },

  async getByMovie(req, res) {
    const movieId = req.params.movieId;
    const showtimes = await ShowtimeModel.findByMovie(movieId);
    return res.json(showtimes);
  },

  async create(req, res) {
    const result = CreateShowtimeSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const showtime = await ShowtimeModel.create(result.data);
    return res.status(201).json(showtime);
  },

  async update(req, res) {
    const result = CreateShowtimeSchema.partial().safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const showtime = await ShowtimeModel.update(req.params.id, result.data);
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    return res.json(showtime);
  },

  async delete(req, res) {
    const showtime = await ShowtimeModel.delete(req.params.id);
    if (!showtime) {
      return res.status(404).json({ message: 'Showtime not found' });
    }
    return res.status(204).end();
  },
};

export const reservationController = {
  async getAll(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const reservations = await ReservationModel.findByUser(req.user.id);
    return res.json(reservations);
  },

  async create(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const result = ReservationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    try {
      const reservation = await ReservationModel.createTransactional({
        ...result.data,
        userId: req.user.id,
      });
      return res.status(201).json(reservation);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },

  async cancel(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const { reservationId } = req.params;
    const reservation = await ReservationModel.cancel(reservationId);
    
    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }
    
    return res.json({ message: 'Reservation cancelled', reservation });
  },
};

export const paymentController = {
  async createIntent(req, res) {
    const result = PaymentIntentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { amount } = result.data;
    
    // In a real app, would create Stripe PaymentIntent
    const paymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).slice(2)}`,
      client_secret: `secret_${Date.now()}_${Math.random().toString(36).slice(2)}`,
    };
    
    return res.json(paymentIntent);
  },

  async confirm(req, res) {
    const result = PaymentConfirmSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    // In a real app, would confirm with Stripe and update reservation payment status
    const { paymentIntentId, reservationId } = result.data;
    
    return res.json({ 
      message: 'Payment confirmed', 
      paymentIntentId,
      reservationId 
    });
  },
};

export const reportController = {
  async getAllReservations(req, res) {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin only' });
    }
    
    const reservations = await ReservationModel.findByUser('admin'); // Simplified
    return res.json(reservations);
  },

  async getRevenue(req, res) {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin only' });
    }
    
    // In a real app, would calculate actual revenue from paid reservations
    const revenue = 0; // Placeholder
    return res.json({ revenue });
  },
};