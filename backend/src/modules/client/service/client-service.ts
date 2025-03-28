import { NotFound } from '../../../common/errors/http-errors';
import { ClientRepository } from '../repository/client-repository';

export class ClientService {
  constructor(private readonly clientRepository: ClientRepository) {
    this.clientRepository = clientRepository;
  }

  async getById(id: number) {
    const client = await this.clientRepository.getById(id);
    if (!client) throw new NotFound('Cliente não encontrado');
    return client;
  }
}
