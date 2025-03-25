import prisma from '../../../prisma/db';

export class ClientRepository {
  async getById(id: number) {
    return await prisma.client.findUnique({ where: { id } });
  }
}
