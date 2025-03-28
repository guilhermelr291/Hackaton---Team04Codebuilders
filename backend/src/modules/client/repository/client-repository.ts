import prisma from '../../../prisma/db';
import { ClientParams } from '../service/client-service';

export class ClientRepository {
  async getById(id: number) {
    return await prisma.client.findUnique({ where: { id } });
  }

  async create(data: ClientParams) {
    const client = await prisma.client.create({ data });
    return client;
  }
  async update(id: number, data: ClientParams) {
    const client = await prisma.client.update({ where: { id }, data });
    return client;
  }
  async delete(id: number) {
    await prisma.client.delete({ where: { id } });
  }
}
