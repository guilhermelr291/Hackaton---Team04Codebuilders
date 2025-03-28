// #Esse arquivo foi criado com o auxílio de IA

import { describe, beforeEach, test, vi, expect } from 'vitest';
import { ClientController } from './client-controller';
import { NextFunction, Request, Response } from 'express';
import { ClientService } from '../service/client-service';

const mockClientService = {
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
  getUserClients: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'any_name',
      email: 'any_email@mail.com',
      phone: 'any_phone',
      userId: 1,
    },
  ]),
  getById: vi.fn().mockResolvedValue({
    id: 1,
    name: 'any_name',
    email: 'any_email@mail.com',
    phone: 'any_phone',
    userId: 1,
  }),
} as unknown as ClientService;

describe('ClientController', () => {
  let sut: ClientController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    vi.clearAllMocks;

    sut = new ClientController(mockClientService);

    mockRequest = {
      userId: 1,
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        phone: 'any_phone',
      },
    };

    mockResponse = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    mockNext = vi.fn();
  });

  describe('create()', () => {
    test('Should call clientService.create with correct values', async () => {
      const createSpy = vi.spyOn(mockClientService, 'create');

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
        message: 'Cliente criado com sucesso!',
      });
    });

    test('Should call next with error if clientService.create throws', async () => {
      const error = new Error();
      vi.spyOn(mockClientService, 'create').mockImplementationOnce(() => {
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
        body: {
          name: 'any_name',
          email: 'any_email@mail.com',
          phone: 'any_phone',
        },
      };
    });

    test('Should call clientService.update with correct values', async () => {
      const updateSpy = vi.spyOn(mockClientService, 'update');

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
        message: 'Cliente atualizado com sucesso!',
      });
    });

    test('Should call next with error if clientService.update throws', async () => {
      const error = new Error();
      vi.spyOn(mockClientService, 'update').mockImplementationOnce(() => {
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

    test('Should call clientService.delete with correct values', async () => {
      const deleteSpy = vi.spyOn(mockClientService, 'delete');

      await sut.delete(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId, params } = mockRequest;

      expect(deleteSpy).toHaveBeenCalledWith(Number(params!.id), userId);
    });

    test('Should call next with error if clientService.delete throws', async () => {
      const error = new Error();
      vi.spyOn(mockClientService, 'delete').mockImplementationOnce(() => {
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
        message: 'Cliente excluído com sucesso!',
      });
    });
  });

  describe('getUserClients()', () => {
    test('Should call clientService.getUserClients with correct value', async () => {
      const getUserClientsSpy = vi.spyOn(mockClientService, 'getUserClients');

      await sut.getUserClients(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId } = mockRequest;

      expect(getUserClientsSpy).toHaveBeenCalledWith(userId);
    });

    test('Should call next with error if clientService.getUserClients throws', async () => {
      const error = new Error();
      vi.spyOn(mockClientService, 'getUserClients').mockImplementationOnce(
        () => {
          throw error;
        }
      );
      await sut.getUserClients(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });

    test('Should return 200 status with clients data on success', async () => {
      await sut.getUserClients(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith([
        {
          id: 1,
          name: 'any_name',
          email: 'any_email@mail.com',
          phone: 'any_phone',
          userId: 1,
        },
      ]);
    });
  });

  describe('getById()', () => {
    beforeEach(() => {
      mockRequest = {
        params: { id: '1' },
        userId: 1,
      };
    });

    test('Should call clientService.getById with correct values', async () => {
      const getByIdSpy = vi.spyOn(mockClientService, 'getById');

      await sut.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      const { userId, params } = mockRequest;

      expect(getByIdSpy).toHaveBeenCalledWith(Number(params!.id), userId);
    });

    test('Should call next with error if clientService.getById throws', async () => {
      const error = new Error();
      vi.spyOn(mockClientService, 'getById').mockImplementationOnce(() => {
        throw error;
      });

      await sut.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(error);
    });

    test('Should return 200 status with client data on success', async () => {
      await sut.getById(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
        phone: 'any_phone',
        userId: 1,
      });
    });
  });
});
