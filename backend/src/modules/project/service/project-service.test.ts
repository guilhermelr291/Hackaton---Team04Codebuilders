import { describe, beforeEach, test, vi, expect } from 'vitest';
import {
  CreateProjectParams,
  ProjectService,
  updateProjectParams,
} from './project-service';
import {
  NotFound,
  UnprocessableEntity,
} from '../../../common/errors/http-errors';

const mockProjectRepository = {
  create: vi.fn(),
  update: vi.fn(),
  getById: vi.fn().mockResolvedValue(true),
  delete: vi.fn(),
  getUserProjects: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'any_name',
      clientId: 1,
      userId: 1,
      status: 'IN_PROGRESS',
      price: 10,
    },
  ]),
};
const mockClientRepository = {
  getById: vi.fn().mockResolvedValue(true),
};

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

describe('ProjectService', () => {
  let sut: ProjectService;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new ProjectService(mockProjectRepository, mockClientRepository);
  });

  describe('create()', () => {
    test('Should call clientRepository.getById with correct value', async () => {
      const getByIdSpy = vi.spyOn(mockClientRepository, 'getById');

      const createProjectParams = mockCreateProjectParams();

      await sut.create(createProjectParams);

      expect(getByIdSpy).toHaveBeenCalledWith(createProjectParams.clientId);
    });

    test('Should throw UnprocessableEntity if client does not exist', async () => {
      vi.spyOn(mockClientRepository, 'getById').mockResolvedValueOnce(null);

      await expect(sut.create(mockCreateProjectParams())).rejects.toThrow(
        UnprocessableEntity
      );
    });

    test('Should call projectRepository.create with correct params', async () => {
      const createSpy = vi.spyOn(mockProjectRepository, 'create');
      const createProjectParams = mockCreateProjectParams();

      await sut.create(createProjectParams);

      expect(createSpy).toHaveBeenCalledWith(createProjectParams);
    });

    test('Should throw if clientRepository.getById throws', async () => {
      vi.spyOn(mockClientRepository, 'getById').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.create(mockCreateProjectParams())).rejects.toThrow();
    });

    test('Should throw if projectRepository.create throws', async () => {
      vi.spyOn(mockProjectRepository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      await expect(sut.create(mockCreateProjectParams())).rejects.toThrow();
    });
  });
  describe('update()', () => {
    test('Should call projectRepository.update with correct params', async () => {
      const createSpy = vi.spyOn(mockProjectRepository, 'update');
      const updateProjectParams = mockUpdateProjectParams();

      await sut.update(updateProjectParams);

      expect(createSpy).toHaveBeenCalledWith(updateProjectParams);
    });

    test('Should call projectRepository.getById with correct value', async () => {
      const getByIdSpy = vi.spyOn(mockProjectRepository, 'getById');
      const updateProjectParams = mockUpdateProjectParams();

      await sut.update(updateProjectParams);

      const { id, userId } = updateProjectParams;
      expect(getByIdSpy).toHaveBeenCalledWith(id, userId);
    });
    test('Should throws NotFound error if ProjectRepository.getById returns falsy', async () => {
      vi.spyOn(mockProjectRepository, 'getById').mockResolvedValueOnce(false);

      expect(sut.update(mockUpdateProjectParams())).rejects.toThrow(NotFound);
    });

    test('Should throw if projectRepository.update throws', async () => {
      vi.spyOn(mockProjectRepository, 'update').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.update(mockUpdateProjectParams())).rejects.toThrow();
    });
    test('Should throw if projectRepository.getById throws', async () => {
      vi.spyOn(mockProjectRepository, 'getById').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.update(mockUpdateProjectParams())).rejects.toThrow();
    });
  });
  describe('delete()', () => {
    test('Should call projectRepository.getById with correct value', async () => {
      const getByIdSpy = vi.spyOn(mockProjectRepository, 'getById');
      const id = 1;
      const userId = 2;

      await sut.delete(id, userId);

      expect(getByIdSpy).toHaveBeenCalledWith(id, userId);
    });

    test('Should throws NotFound error if ProjectRepository.getById returns falsy', async () => {
      vi.spyOn(mockProjectRepository, 'getById').mockResolvedValueOnce(false);

      expect(sut.delete(1, 2)).rejects.toThrow(NotFound);
    });
    test('Should throw if projectRepository.getById throws', async () => {
      vi.spyOn(mockProjectRepository, 'getById').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(sut.delete(1, 2)).rejects.toThrow();
    });
    test('Should throw if projectRepository.delete throws', async () => {
      vi.spyOn(mockProjectRepository, 'delete').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(sut.delete(1, 2)).rejects.toThrow();
    });

    test('Should call projectRepository.delete with correct values', async () => {
      const deleteSpy = vi.spyOn(mockProjectRepository, 'delete');

      const id = 1;
      const userId = 2;

      await sut.delete(id, userId);

      expect(deleteSpy).toHaveBeenCalledWith(id, userId);
    });
  });
  describe('getUserProjects()', () => {
    test('Should call projectRepository.getUserProjects with correct value', async () => {
      const getUserProjectsSpy = vi.spyOn(
        mockProjectRepository,
        'getUserProjects'
      );

      const userId = 1;

      await sut.getUserProjects(userId);

      expect(getUserProjectsSpy).toHaveBeenCalledWith(userId);
    });

    test('Should throw if projectRepository.getUserProjects throws', async () => {
      vi.spyOn(mockProjectRepository, 'getUserProjects').mockImplementationOnce(
        () => {
          throw new Error();
        }
      );
      const userId = 1;
      expect(sut.getUserProjects(userId)).rejects.toThrow();
    });
    test('Should return correct value', async () => {
      const userId = 1;
      const result = await sut.getUserProjects(userId);

      expect(result).toEqual([
        {
          id: 1,
          name: 'any_name',
          clientId: 1,
          userId: 1,
          status: 'IN_PROGRESS',
          price: 10,
        },
      ]);
    });
  });

  describe('getById()', () => {
    test('Should call projectRepository.getById with correct values', async () => {
      const getByIdSpy = vi.spyOn(mockProjectRepository, 'getById');
      const id = 1;
      const userId = 2;

      await sut.getById(id, userId);

      expect(getByIdSpy).toHaveBeenCalledWith(id, userId);
    });
    test('Should throw NotFound error if projectRepository.getById returns null', async () => {
      const error = new NotFound('Projeto não encontrado');
      vi.spyOn(mockProjectRepository, 'getById').mockResolvedValueOnce(null);

      const id = 1;
      const userId = 2;

      expect(sut.getById(id, userId)).rejects.toThrow(error);
    });
  });
});
