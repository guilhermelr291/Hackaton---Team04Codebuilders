import prisma from '../../../prisma/db';
import { CreateProjectParams } from '../service/project-service';

export class ProjectRepository {
  async create(data: CreateProjectParams) {
    const project = await prisma.project.create({ data });
    return project;
  }
}
