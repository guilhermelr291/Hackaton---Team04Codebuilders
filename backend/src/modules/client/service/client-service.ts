import { NotFound } from '../../../common/errors/http-errors';
import { ClientRepository } from '../repository/client-repository';

export type ClientParams = {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  neighborhood?: string;
  postalCode?: string;
};

export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async getById(id: number) {
    const client = await this.clientRepository.getById(id);
    if (!client) throw new NotFound('Cliente não encontrado');
    return client;
  }
  async create(data: ClientParams) {
    await this.clientRepository.create(data);
  }

  async update(id: number, data: ClientParams) {
    const client = await this.clientRepository.getById(id);
    if (!client) throw new NotFound('Cliente não encontrado');

    await this.clientRepository.update(id, data);
  }
}
