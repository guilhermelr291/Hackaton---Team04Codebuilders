import { test, describe, beforeEach, vi, expect } from 'vitest';
import prisma from '../../../prisma/db';
import { CreateProjectParams } from '../service/project-service';
import { ProjectRepository } from './project-repository';

vi.mock('../../../prisma/db', () => ({
  default: {
    project: { create: vi.fn() },
  },
}));

const mockProjectParams = (): CreateProjectParams => ({
  name: 'any_name',
  clientId: 1,
  userId: 1,
  status: 'IN_PROGRESS',
  price: 10,
});

describe('ProjectRepository', () => {
  let sut: ProjectRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new ProjectRepository();
  });

  describe('create', () => {
    test('Should call prisma with correct params', async () => {
      const createProjectParams = mockProjectParams();

      await sut.create(createProjectParams);

      expect(prisma.project.create).toHaveBeenCalledWith({
        data: createProjectParams,
      });
    });
  });
});
