class MovieModel {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findAll() {
    return this.prisma.movie.findMany({ orderBy: { title: 'asc' } });
  }

  async findById(id) {
    return this.prisma.movie.findUnique({ where: { id } });
  }

  async create(data) {
    return this.prisma.movie.create({ data });
  }

  async update(id, data) {
    return this.prisma.movie.update({ where: { id }, data });
  }

  async delete(id) {
    return this.prisma.movie.delete({ where: { id } });
  }
}

export default MovieModel;