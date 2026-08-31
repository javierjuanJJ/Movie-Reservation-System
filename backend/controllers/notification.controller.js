import resend from '../lib/resend.js';
import twilio from '../lib/twilio.js';

export const notificationController = {
  async sendEmail(req, res) {
    const { reservationId, movieTitle, showtimeDate, seats, userEmail } = req.body;
    
    const emailContent = `
      <h1>Reservation Confirmation</h1>
      <p>Movie: ${movieTitle}</p>
      <p>Showtime: ${showtimeDate}</p>
      <p>Seats: ${seats.map(s => `${s.row}-${s.number}`).join(', ')}</p>
      <p>Reservation ID: ${reservationId}</p>
    `;
    
    const { data, error } = await resend.emails.send({
      from: 'on-reservation-system@example.com',
      to: userEmail,
      subject: `Reservation Confirmation - ${movieTitle}`,
      html: emailContent,
    });
    
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    
    return res.json({ 
      message: 'Email sent successfully', 
      data 
    });
  },

  async sendSms(req, res) {
    const { phoneNumber, movieTitle, showtimeDate, seats } = req.body;
    
    const smsMessage = `Your reservation for ${movieTitle} at ${showtimeDate} is confirmed for seats: ${seats.map(s => `${s.row}-${s.number}`).join(', ')}`;
    
    const { data, error } = await twilio.messages.create({
      body: smsMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    
    return res.json({ 
      message: 'SMS sent successfully', 
      data 
    });
  },

  async sendPushNotification(req, res) {
    const { userId, title, body } = req.body;
    
    // In a real app, would use Firebase Cloud Messaging or similar
    return res.json({ 
      message: 'Push notification sent successfully', 
      userId, 
      title, 
      body 
    });
  },

  async sendSmsReminder(req, res) {
    const { reservationId, movieTitle, showtimeDate, seats, phoneNumber } = req.body;
    
    const smsMessage = `Reminder: Your reservation ${reservationId} for ${movieTitle} at ${showtimeDate} is confirmed for seats: ${seats.map(s => `${s.row}-${s.number}`).join(', ')}`;
    
    const { data, error } = await twilio.messages.create({
      body: smsMessage,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber,
    });
    
    if (error) {
      return res.status(500).json({ message: error.message });
    }
    
    return res.json({ 
      message: 'SMS reminder sent successfully', 
      data 
    });
  },
};