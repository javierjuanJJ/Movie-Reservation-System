import { BetterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Missing or invalid token' });
    }
    const token = authHeader.split(' ')[1];
    
    // Initialize better-auth with prisma adapter
    const auth = new BetterAuth({
      database: prismaAdapter(/* prisma client */),
      // ... config
    });
    
    const session = await auth.api.getSession({ token });
    if (!session?.user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    
    req.user = session.user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

export const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};