import { describe, beforeEach, test, vi, expect } from 'vitest';
import { ProjectController } from './project-controller';
import { NextFunction, Request, Response } from 'express';
import { ProjectService } from '../service/project-service';

const mockProjectService = {
  create: vi.fn(),
  update: vi.fn(),
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
} as unknown as ProjectService;

describe('ProjectController', () => {
  let sut: ProjectController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks;

    sut = new ProjectController(mockProjectService);

    mockRequest = {
      userId: 1,
      body: { name: 'any_name', clientId: 1, price: 10 },
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    mockNext = vi.fn();
  });

  describe('create()', () => {
    test('Should call projectService.create with correct values', async () => {
      const createSpy = vi.spyOn(mockProjectService, 'create');

      await sut.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId, body } = mockRequest;

      expect(createSpy).toHaveBeenCalledWith({ userId, ...body });
    });

    test('Should return 201 status with success message on success', async () => {
      await sut.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Projeto criado com sucesso!',
      });
    });

    test('Should call next with error if projectService.create throws', async () => {
      const error = new Error();
      vi.spyOn(mockProjectService, 'create').mockImplementationOnce(() => {
        throw error;
      });

      await sut.create(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  describe('update()', () => {
    beforeEach(() => {
      mockRequest = {
        params: { id: '1' },
        userId: 1,
        body: { name: 'any_name', status: 'IN_PROGRESS', price: 10 },
      };
    });

    test('Should call projectService.update with correct values', async () => {
      const updateSpy = vi.spyOn(mockProjectService, 'update');

      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId, body, params } = mockRequest;

      expect(updateSpy).toHaveBeenCalledWith({
        id: Number(params!.id),
        userId,
        ...body,
      });
    });

    test('Should return 200 status with success message on success', async () => {
      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Projeto atualizado com sucesso!',
      });
    });

    test('Should call next with error if projectService.update throws', async () => {
      const error = new Error();
      vi.spyOn(mockProjectService, 'update').mockImplementationOnce(() => {
        throw error;
      });

      await sut.update(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
  describe('delete()', () => {
    beforeEach(() => {
      mockRequest = {
        params: { id: '1' },
        userId: 1,
      };
    });

    test('Should call projectService.delete with correct values', async () => {
      const deleteSpy = vi.spyOn(mockProjectService, 'delete');

      await sut.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId, params } = mockRequest;

      expect(deleteSpy).toHaveBeenCalledWith(Number(params!.id), userId);
    });

    test('Should call next with error if projectService.delete throws', async () => {
      const error = new Error();
      vi.spyOn(mockProjectService, 'delete').mockImplementationOnce(() => {
        throw error;
      });

      await sut.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });

    test('Should return 200 status with success message on success', async () => {
      await sut.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Projeto excluído com sucesso!',
      });
    });
  });
  describe('getUserProjects()', () => {
    test('Should call projectService.getUserProjects with correct value', async () => {
      const getUserProjectsSpy = vi.spyOn(
        mockProjectService,
        'getUserProjects'
      );

      await sut.getUserProjects(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId } = mockRequest;

      expect(getUserProjectsSpy).toHaveBeenCalledWith(userId);
    });

    test('Should call next with error if projectService.getUserProjects throws', async () => {
      const error = new Error();
      vi.spyOn(mockProjectService, 'getUserProjects').mockImplementationOnce(
        () => {
          throw error;
        }
      );
      await sut.getUserProjects(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });

    test('Should return 200 status with projects data on success', async () => {
      await sut.getUserProjects(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([
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
});
