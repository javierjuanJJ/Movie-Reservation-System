class ReservationModel {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findByUser(userId) {
    return this.prisma.reservation.findMany({
      where: { userId },
      include: { showtime: { include: { movie: true } } },
    });
  }

  async findById(id) {
    return this.prisma.reservation.findUnique({ where: { id } });
  }

  async createTransactional(data) {
    const { showtimeId, seats, userId } = data;

    return this.prisma.$transaction(async (tx) => {
      // Check seat availability within transaction
      const showtime = await tx.showtime.findUnique({
        where: { id: showtimeId },
        include: { movie: true },
      });

      if (!showtime) {
        throw new Error('Showtime not found');
      }

      // Validate seats are available (simplified - real implementation would check existing reservations)
      for (const seat of seats) {
        // Check if seat already reserved - this is a placeholder for actual logic
        const existingReservation = await tx.reservation.findFirst({
          where: { showtimeId, seats: { hasSome: [seat] } },
        });
        if (existingReservation) {
          throw new Error(`Seat ${seat.row}-${seat.number} already reserved`);
        }
      }

      // Create reservation
      const reservation = await tx.reservation.create({
        data: {
          userId,
          showtimeId,
          seats,
          status: 'confirmed',
        },
      });

      return reservation;
    });
  }

  async cancel(id) {
    const now = new Date();
    return this.prisma.reservation.update({
      where: { id },
      data: { 
        status: 'cancelled',
        cancelledAt: now,
        // Only allow cancelling future reservations
        // This would be enforced at the application level checking showtime.date
      },
    });
  }

  async findByShowtime(showtimeId) {
    return this.prisma.reservation.findMany({
      where: { showtimeId },
    });
  }
}

export default ReservationModel;