import { describe, beforeEach, test, vi, expect } from 'vitest';
import { ProjectController } from './project-controller';
import { NextFunction, Request, Response } from 'express';
import { ProjectService } from '../service/project-service';

const mockProjectService = {
  create: vi.fn(),
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

  describe('create', () => {
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
  });
});
