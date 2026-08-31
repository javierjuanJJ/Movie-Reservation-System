import { signupSchema, loginSchema } from '../schemas/movies.js';
import bcrypt from 'bcrypt';

export const authController = {
  async signup(req, res) {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { email, password, name } = result.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // TODO: Create user in database with Prisma
    // await prisma.user.create({
    //   data: { email, password: hashedPassword, role: 'USER', name }
    // });
    
    return res.status(201).json({ message: 'User created', email });
  },

  async login(req, res) {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: result.error.errors });
    }
    
    const { email, password } = result.data;
    // TODO: Verify user credentials against database
    // const user = await prisma.user.findUnique({ where: { email } });
    // if (!user || !(await bcrypt.compare(password, user.password))) {
    //   return res.status(401).json({ message: 'Invalid credentials' });
    // }
    
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