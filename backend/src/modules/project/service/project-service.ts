import { UnprocessableEntity } from '../../../common/errors/http-errors';
import { ClientRepository } from '../../client/repository/client-repository';
import { ProjectRepository } from '../repository/project-repository';

export type CreateProjectParams = {
  name: string;
  clientId: number;
  userId: number;
  status?:
    | 'PLANNING'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'PENDING_PAYMENT'
    | 'OVERDUE';
  price?: number;
};

export type updateProjectParams = {
  name: string;
  status?:
    | 'PLANNING'
    | 'IN_PROGRESS'
    | 'COMPLETED'
    | 'PENDING_PAYMENT'
    | 'OVERDUE';
  price?: number;
};

export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly clientRepository: ClientRepository
  ) {
    this.projectRepository = projectRepository;
    this.clientRepository = clientRepository;
  }

  async create(data: CreateProjectParams) {
    const client = await this.clientRepository.getById(data.clientId);
    if (!client) throw new UnprocessableEntity('Cliente não encontrado');

    await this.projectRepository.create(data);
  }
  async update(id: number, data: updateProjectParams) {
    return await this.projectRepository.update(id, data);
  }
}
