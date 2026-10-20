import { Resend } from 'resend';

let resend = null;

function getResend() {
  if (!resend) {
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

// Lazy proxy: the Resend client is only instantiated on first use,
// so a missing RESEND_API_KEY does not crash the server at boot.
export default new Proxy(
  {},
  {
    get(_target, prop) {
      const real = getResend();
      const value = real[prop];
      return typeof value === 'function' ? value.bind(real) : value;
    },
  },
);
