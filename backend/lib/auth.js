import { betterAuth } from 'better-auth';
import { prismaAdapter } from '@better-auth/prisma-adapter';
import { resolvers } from 'better-auth/resolvers';

export const auth = betterAuth({
  database: prismaAdapter(/* prisma client */, {
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
  plugins: [
    resolvers.emailVerification(),
    resolvers.passwordReset(),
  ],
});