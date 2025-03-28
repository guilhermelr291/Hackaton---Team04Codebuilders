import { UnprocessableEntity } from '../../../common/errors/http-errors';
import { ProjectRepository } from '../../project/repository/project-repository';
import { TimeEntryRepository } from '../repository/time-entry-repository';

export type CreateTimeEntryParams = {
  userId: number;
  projectId: number;
  duration: number;
  description: string;
  date: Date;
};

export class TimeEntryService {
  constructor(
    private readonly timeEntryRepository: TimeEntryRepository,
    private readonly projectRepository: ProjectRepository
  ) {
    this.timeEntryRepository = timeEntryRepository;
    this.projectRepository = projectRepository;
  }

  async create(data: CreateTimeEntryParams) {
    const project = await this.projectRepository.getById(
      data.projectId,
      data.userId
    );
    if (!project) throw new UnprocessableEntity('Projeto não encontrado');

    await this.timeEntryRepository.create(data);
  }
}
