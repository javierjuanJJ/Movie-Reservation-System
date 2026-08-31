class UserModel {
  constructor(prisma) {
    this.prisma = prisma;
  }

  async findByEmail(email) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async create(data) {
    return this.prisma.user.create({ data });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findById(id) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async updateRole(id, role) {
    return this.prisma.user.update({
      where: { id },
      data: { role },
    });
  }
}

export default UserModel;