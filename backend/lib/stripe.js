import Stripe from 'stripe';

let stripe = null;

function getStripe() {
  if (!stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error('STRIPE_SECRET_KEY environment variable is not set');
    }
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2024-09-30',
    });
  }
  return stripe;
}

// Lazy proxy: the Stripe client is only instantiated on first use,
// so a missing STRIPE_SECRET_KEY does not crash the server at boot.
export default new Proxy(
  {},
  {
    get(_target, prop) {
      const real = getStripe();
      const value = real[prop];
      return typeof value === 'function' ? value.bind(real) : value;
    },
  },
);
