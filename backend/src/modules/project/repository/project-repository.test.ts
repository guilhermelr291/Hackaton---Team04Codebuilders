import { test, describe, beforeEach, vi, expect } from 'vitest';
import prisma from '../../../prisma/db';
import {
  CreateProjectParams,
  updateProjectParams,
} from '../service/project-service';
import { ProjectRepository } from './project-repository';

vi.mock('../../../prisma/db', () => ({
  default: {
    project: {
      create: vi.fn().mockResolvedValue({
        id: 1,
        name: 'any_name',
        clientId: 1,
        userId: 1,
        status: 'IN_PROGRESS',
        price: 10,
      }),
      update: vi.fn().mockResolvedValue({
        id: 1,
        name: 'any_name',
        clientId: 1,
        userId: 1,
        status: 'IN_PROGRESS',
        price: 10,
      }),
      delete: vi.fn(),
      findMany: vi.fn().mockResolvedValue([
        {
          id: 1,
          name: 'any_name',
          clientId: 1,
          userId: 1,
          status: 'IN_PROGRESS',
          price: 10,
        },
        {
          id: 2,
          name: 'another_name',
          clientId: 1,
          userId: 1,
          status: 'IN_PROGRESS',
          price: 5,
        },
      ]),
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        name: 'any_name',
        clientId: 1,
        userId: 1,
        status: 'IN_PROGRESS',
        price: 10,
      }),
    },
  },
}));

const mockProjectModel = () => ({
  id: 1,
  name: 'any_name',
  clientId: 1,
  userId: 1,
  status: 'IN_PROGRESS',
  price: 10,
});
const mockCreateProjectParams = (): CreateProjectParams => ({
  name: 'any_name',
  clientId: 1,
  userId: 1,
  status: 'IN_PROGRESS',
  price: 10,
});
const mockUpdateProjectParams = (): updateProjectParams => ({
  id: 1,
  userId: 1,
  name: 'any_name',
  status: 'IN_PROGRESS',
  price: 10,
});

const mockProjects = () => [
  {
    id: 1,
    name: 'any_name',
    clientId: 1,
    userId: 1,
    status: 'IN_PROGRESS',
    price: 10,
  },
  {
    id: 2,
    name: 'another_name',
    clientId: 1,
    userId: 1,
    status: 'IN_PROGRESS',
    price: 5,
  },
];

describe('ProjectRepository', () => {
  let sut: ProjectRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new ProjectRepository();
  });

  describe('create()', () => {
    test('Should call prisma with correct params', async () => {
      const createProjectParams = mockCreateProjectParams();

      await sut.create(createProjectParams);

      expect(prisma.project.create).toHaveBeenCalledWith({
        data: createProjectParams,
      });
    });
    test('Should return created project', async () => {
      const result = await sut.create(mockCreateProjectParams());

      expect(result).toStrictEqual(mockProjectModel());
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.project.create).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.create(mockCreateProjectParams())).rejects.toThrow();
    });
  });
  describe('update()', () => {
    test('Should call prisma with correct params', async () => {
      const updateProjectParams = mockUpdateProjectParams();

      await sut.update(updateProjectParams);

      const { id, userId, ...projectData } = updateProjectParams;

      expect(prisma.project.update).toHaveBeenCalledWith({
        where: { id, userId },
        data: projectData,
      });
    });

    test('Should return updated project', async () => {
      const result = await sut.update(mockUpdateProjectParams());

      expect(result).toStrictEqual(mockProjectModel());
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.project.update).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.update(mockUpdateProjectParams())).rejects.toThrow();
    });
  });
  describe('delete()', () => {
    test('Should call prisma with correct values', async () => {
      const id = 1;
      const userId = 2;
      await sut.delete(id, userId);

      expect(prisma.project.delete).toHaveBeenCalledWith({
        where: { id, userId },
      });
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.project.delete).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.delete(1, 2)).rejects.toThrow();
    });
  });

  describe('getUserProjects()', () => {
    test('Should call prisma with correct value', async () => {
      const userId = 1;
      await sut.getUserProjects(userId);

      expect(prisma.project.findMany).toHaveBeenCalledWith({
        where: { userId },
      });
    });

    test('Should throw if prisma throws', async () => {
      const userId = 1;
      vi.mocked(prisma.project.findMany).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.getUserProjects(userId)).rejects.toThrow();
    });
    test('Should return correct projects', async () => {
      const userId = 1;
      const result = await sut.getUserProjects(userId);

      expect(result).toStrictEqual(mockProjects());
    });
  });

  describe('getById()', () => {
    test('Should call prisma with correct values', async () => {
      const id = 1;
      const userId = 2;
      await sut.getById(id, userId);

      expect(prisma.project.findUnique).toHaveBeenCalledWith({
        where: { id, userId },
      });
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.project.findUnique).mockImplementationOnce(() => {
        throw new Error();
      });
      const id = 1;
      const userId = 2;
      expect(sut.getById(id, userId)).rejects.toThrow();
    });
  });
});
