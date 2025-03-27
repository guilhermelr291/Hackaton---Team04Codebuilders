import prisma from '../../../prisma/db';
import {
  CreateProjectParams,
  updateProjectParams,
} from '../service/project-service';

export class ProjectRepository {
  async create(data: CreateProjectParams) {
    const project = await prisma.project.create({ data });
    return project;
  }
  async update(id: number, data: updateProjectParams) {
    const project = await prisma.project.update({ where: { id }, data });
    return project;
  }
}
