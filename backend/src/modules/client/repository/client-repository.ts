import prisma from '../../../prisma/db';
import {
  CreateClientParams,
  UpdateClientParams,
} from '../service/client-service';

export class ClientRepository {
  async getById(id: number, userId: number) {
    return await prisma.client.findUnique({ where: { id, userId } });
  }

  async create(data: CreateClientParams) {
    const client = await prisma.client.create({ data });
    return client;
  }
  async update(data: UpdateClientParams) {
    const { id, userId, ...clientData } = data;
    const client = await prisma.client.update({
      where: { id, userId },
      data: clientData,
    });
    return client;
  }
  async delete(id: number, userId: number) {
    await prisma.client.delete({ where: { id, userId } });
  }
  async getUserClients(userId: number) {
    const clients = await prisma.client.findMany({ where: { userId } });
    return clients;
  }
}
