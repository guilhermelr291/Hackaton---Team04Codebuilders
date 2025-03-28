import { NotFound } from '../../../common/errors/http-errors';
import { ClientRepository } from '../repository/client-repository';

export type UpdateClientParams = {
  id: number;
  userId: number;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  neighborhood?: string;
  postalCode?: string;
};
export type CreateClientParams = Omit<UpdateClientParams, 'id'>;

export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async getUserClients(userId: number) {
    const clients = await this.clientRepository.getUserClients(userId);
    return clients;
  }

  async getById(id: number, userId: number) {
    const client = await this.clientRepository.getById(id, userId);
    if (!client) throw new NotFound('Cliente não encontrado');
    return client;
  }
  async create(data: CreateClientParams) {
    await this.clientRepository.create(data);
  }

  async update(data: UpdateClientParams) {
    const { id, userId } = data;
    const client = await this.clientRepository.getById(id, userId);
    if (!client) throw new NotFound('Cliente não encontrado');

    await this.clientRepository.update(data);
  }

  async delete(id: number, userId: number) {
    const client = await this.clientRepository.getById(id, userId);
    if (!client) throw new NotFound('Cliente não encontrado');

    await this.clientRepository.delete(id, userId);
  }
}
