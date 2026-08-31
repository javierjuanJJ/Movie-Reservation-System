import { signupSchema, loginSchema } from '../schemas/movies.js';

export const authController = {
  async signup(req, res) {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { email, password, name } = result.data;
    return res.status(201).json({ message: 'User created', email });
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