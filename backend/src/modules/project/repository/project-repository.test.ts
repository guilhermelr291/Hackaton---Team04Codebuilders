import {
  test,
  describe,
  beforeEach,
  vi,
  expect,
  beforeAll,
  afterAll,
} from 'vitest';
import prisma from '../../../prisma/db';
import { CreateProjectParams } from '../service/project-service';
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

describe('ProjectRepository', () => {
  let sut: ProjectRepository;

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new ProjectRepository();
  });

  describe('create', () => {
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
});
