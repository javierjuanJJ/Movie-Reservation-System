export const notificationController = {
  async sendEmail(req, res) {
    const { reservationId, movieTitle, showtimeDate, seats, userEmail } = req.body;
    
    // In a real app, would use Resend or SendGrid API
    const emailContent = `
      <h1>Reservation Confirmation</h1>
      <p>Movie: ${movieTitle}</p>
      <p>Showtime: ${showtimeDate}</p>
      <p>Seats: ${seats.map(s => `${s.row}-${s.number}`).join(', ')}</p>
      <p>Email: ${userEmail}</p>
    `;
    
    return res.json({ 
      message: 'Email sent successfully', 
      emailContent 
    });
  },

  async sendSms(req, res) {
    const { phoneNumber, movieTitle, showtimeDate, seats } = req.body;
    
    // In a real app, would use Twilio API
    const smsMessage = `Your reservation for ${movieTitle} at ${showtimeDate} is confirmed for seats: ${seats.map(s => `${s.row}-${s.number}`).join(', ')}`;
    
    return res.json({ 
      message: 'SMS sent successfully', 
      smsMessage 
    });
  },
};