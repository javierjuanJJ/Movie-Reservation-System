import { signupSchema, loginSchema, movieSchema, partialMovieSchema, reservationSchema } from '../schemas/movies.js';

export const authController = {
  async signup(req, res) {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { email, password, name } = result.data;
    // UserModel.create would be called with Prisma
    return res.status(201).json({ 
      message: 'User created', 
      email: result.data.email 
    });
  },

  async login(req, res) {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    return res.json({ message: 'Logged in' });
  },

  async me(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json({ user: req.user });
  },

  async promote(req, res) {
    if (req.user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Only admins can promote users' });
    }
    return res.json({ message: 'User promoted to admin' });
  },
};

export const movieController = {
  async getAll(req, res) {
    return res.json([]); // Would call MovieModel.findAll()
  },

  async create(req, res) {
    const result = movieSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    return res.status(201).json(result.data);
  },

  async getOne(req, res) {
    return res.json({ id: req.params.id });
  },

  async update(req, res) {
    const result = partialMovieSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    return res.json(result.data);
  },

  async delete(req, res) {
    return res.status(204).end();
  },
};

export const reservationController = {
  async getAll(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    return res.json([]); // Would call ReservationModel.findByUser()
  },

  async create(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const result = reservationSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    return res.status(201).json(result.data);
  },

  async cancel(req, res) {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const { reservationId } = req.params;
    return res.json({ message: 'Reservation cancelled', reservationId });
  },
};

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

export const reportController = {
  async getAllReservations(req, res) {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin only' });
    }
    return res.json([]); // Would aggregate reservations
  },

  async getRevenue(req, res) {
    if (req.user?.role !== 'ADMIN') {
      return res.status(403).json({ message: 'Admin only' });
    }
    return res.json({ revenue: 0 }); // Would calculate real revenue
  },
};