class ShowtimeModel {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.showtime.findMany({
      include: { movie: true },
      orderBy: { date: 'asc' },
    });
  }

  async findByMovie(movieId) {
    return this.prisma.showtime.findMany({
      where: { movieId },
      orderBy: { date: 'asc' },
    });
  }

  async findById(id) {
    return this.prisma.showtime.findUnique({ where: { id } });
  }

  async create(data) {
    return this.prisma.showtime.create({ data });
  }

  async update(id, data) {
    return this.prisma.showtime.update({ where: { id }, data });
  }

  async delete(id) {
    return this.prisma.showtime.delete({ where: { id } });
  }
}

export default ShowtimeModel;