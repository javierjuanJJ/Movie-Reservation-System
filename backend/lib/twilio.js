import Twilio from 'twilio';

let client = null;

function getTwilio() {
  if (!client) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (!sid || !token) {
      throw new Error('TWILIO_ACCOUNT_SID / TWILIO_AUTH_TOKEN environment variables are not set');
    }
    client = Twilio(sid, token);
  }
  return client;
}

// Lazy proxy: the Twilio client is only instantiated on first use,
// so missing credentials do not crash the server at boot.
export default new Proxy(
  {},
  {
    get(_target, prop) {
      const real = getTwilio();
      const value = real[prop];
      return typeof value === 'function' ? value.bind(real) : value;
    },
  },
);
