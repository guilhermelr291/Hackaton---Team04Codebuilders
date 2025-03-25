import { describe, beforeEach, test, vi, expect } from 'vitest';
import { CreateProjectParams, ProjectService } from './project-service';
import { UnprocessableEntity } from '../../../common/errors/http-errors';

const mockProjectRepository = {
  create: vi.fn(),
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

describe('ProjectService', () => {
  let sut: ProjectService;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new ProjectService(mockProjectRepository, mockClientRepository);
  });

  describe('create', () => {
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
  });
});
