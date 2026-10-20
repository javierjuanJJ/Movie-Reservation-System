import { betterAuth } from 'better-auth';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import prisma from './prisma.js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    github: false,
    google: false,
    twitter: false,
    facebook: false,
    linkedin: false,
  },
  session: {
    cookieName: 'better-auth-session',
    passwordExpiresIn: '30d',
    sessionExpiresIn: '30d',
  },
});
