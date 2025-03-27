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
  async update(data: updateProjectParams) {
    const { id, userId, ...projectData } = data;
    const project = await prisma.project.update({
      where: { id, userId },
      data: projectData,
    });
    return project;
  }

  async getById(id: number) {
    return await prisma.project.findUnique({ where: { id } });
  }

  async delete(id: number, userId: number) {
    await prisma.project.delete({ where: { id, userId } });
  }
}
