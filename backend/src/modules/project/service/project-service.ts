import {
  NotFound,
  UnprocessableEntity,
} from '../../../common/errors/http-errors';
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
  id: number;
  userId: number;
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
  async update(data: updateProjectParams) {
    const project = await this.projectRepository.getById(data.id, data.userId);
    if (!project) throw new NotFound('Projeto não encontrado');

    await this.projectRepository.update(data);
  }
  async delete(id: number, userId: number) {
    const project = await this.projectRepository.getById(id, userId);
    if (!project) throw new NotFound('Projeto não encontrado');

    await this.projectRepository.delete(id, userId);
  }
  async getUserProjects(userId: number) {
    const projects = await this.projectRepository.getUserProjects(userId);
    return projects;
  }
  async getById(id: number, userId: number) {
    const project = await this.projectRepository.getById(id, userId);
    if (!project) throw new NotFound('Projeto não encontrado');
    return project;
  }
}
