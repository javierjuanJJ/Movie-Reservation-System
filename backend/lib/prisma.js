import { PrismaClient } from '@prisma/client';

let client = null;

function getClient() {
  if (!client) {
    client = new PrismaClient();
  }
  return client;
}

// Lazy proxy: defers PrismaClient construction (and DATABASE_URL
// validation) until the first actual database operation.
const prisma = new Proxy(
  {},
  {
    get(_target, prop) {
      const real = getClient();
      const value = real[prop];
      return typeof value === 'function' ? value.bind(real) : value;
    },
  },
);

export default prisma;
