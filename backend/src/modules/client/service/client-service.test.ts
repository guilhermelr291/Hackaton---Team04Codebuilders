// #Esse arquivo foi criado com o auxílio de IA

import { describe, beforeEach, test, vi, expect } from 'vitest';
import {
  ClientService,
  CreateClientParams,
  UpdateClientParams,
} from './client-service';
import { NotFound } from '../../../common/errors/http-errors';

const mockClientRepository = {
  create: vi.fn(),
  update: vi.fn(),
  getById: vi.fn().mockResolvedValue({
    id: 1,
    name: 'any_name',
    email: 'any_email@mail.com',
    userId: 1,
    phone: '1234567890',
  }),
  delete: vi.fn(),
  getUserClients: vi.fn().mockResolvedValue([
    {
      id: 1,
      name: 'any_name',
      email: 'any_email@mail.com',
      userId: 1,
      phone: '1234567890',
    },
    {
      id: 2,
      name: 'another_name',
      email: 'another_email@mail.com',
      userId: 1,
      phone: '0987654321',
    },
  ]),
};

const mockCreateClientParams = (): CreateClientParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  userId: 1,
  phone: '1234567890',
});

const mockUpdateClientParams = (): UpdateClientParams => ({
  id: 1,
  name: 'updated_name',
  email: 'any_email@mail.com',
  userId: 1,
  phone: '1234567890',
});

describe('ClientService', () => {
  let sut: ClientService;

  beforeEach(() => {
    vi.clearAllMocks();
    sut = new ClientService(mockClientRepository);
  });

  describe('getUserClients()', () => {
    test('Should call clientRepository.getUserClients with correct value', async () => {
      const getUserClientsSpy = vi.spyOn(
        mockClientRepository,
        'getUserClients'
      );
      const userId = 1;

      await sut.getUserClients(userId);

      expect(getUserClientsSpy).toHaveBeenCalledWith(userId);
    });

    test('Should throw if clientRepository.getUserClients throws', async () => {
      vi.spyOn(mockClientRepository, 'getUserClients').mockImplementationOnce(
        () => {
          throw new Error();
        }
      );
      const userId = 1;
      expect(sut.getUserClients(userId)).rejects.toThrow();
    });

    test('Should return correct value', async () => {
      const userId = 1;
      const result = await sut.getUserClients(userId);

      expect(result).toEqual([
        {
          id: 1,
          name: 'any_name',
          email: 'any_email@mail.com',
          userId: 1,
          phone: '1234567890',
        },
        {
          id: 2,
          name: 'another_name',
          email: 'another_email@mail.com',
          userId: 1,
          phone: '0987654321',
        },
      ]);
    });
  });

  describe('getById()', () => {
    test('Should call clientRepository.getById with correct values', async () => {
      const getByIdSpy = vi.spyOn(mockClientRepository, 'getById');
      const id = 1;
      const userId = 2;

      await sut.getById(id, userId);

      expect(getByIdSpy).toHaveBeenCalledWith(id, userId);
    });

    test('Should throw NotFound error if clientRepository.getById returns null', async () => {
      const error = new NotFound('Cliente não encontrado');
      vi.spyOn(mockClientRepository, 'getById').mockResolvedValueOnce(null);

      const id = 1;
      const userId = 2;

      expect(sut.getById(id, userId)).rejects.toThrow(error);
    });

    test('Should return correct value', async () => {
      const id = 1;
      const userId = 2;

      const result = await sut.getById(id, userId);

      expect(result).toStrictEqual({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
        userId: 1,
        phone: '1234567890',
      });
    });

    test('Should throw if clientRepository.getById throws', async () => {
      vi.spyOn(mockClientRepository, 'getById').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(sut.getById(1, 2)).rejects.toThrow();
    });
  });

  describe('create()', () => {
    test('Should call clientRepository.create with correct params', async () => {
      const createSpy = vi.spyOn(mockClientRepository, 'create');
      const createClientParams = mockCreateClientParams();

      await sut.create(createClientParams);

      expect(createSpy).toHaveBeenCalledWith(createClientParams);
    });

    test('Should throw if clientRepository.create throws', async () => {
      vi.spyOn(mockClientRepository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.create(mockCreateClientParams())).rejects.toThrow();
    });
  });

  describe('update()', () => {
    test('Should call clientRepository.getById with correct values', async () => {
      const getByIdSpy = vi.spyOn(mockClientRepository, 'getById');
      const updateClientParams = mockUpdateClientParams();

      await sut.update(updateClientParams);

      const { id, userId } = updateClientParams;
      expect(getByIdSpy).toHaveBeenCalledWith(id, userId);
    });

    test('Should throw NotFound error if clientRepository.getById returns null', async () => {
      vi.spyOn(mockClientRepository, 'getById').mockResolvedValueOnce(null);

      expect(sut.update(mockUpdateClientParams())).rejects.toThrow(NotFound);
    });

    test('Should call clientRepository.update with correct params', async () => {
      const updateSpy = vi.spyOn(mockClientRepository, 'update');
      const updateClientParams = mockUpdateClientParams();

      await sut.update(updateClientParams);

      expect(updateSpy).toHaveBeenCalledWith(updateClientParams);
    });

    test('Should throw if clientRepository.getById throws', async () => {
      vi.spyOn(mockClientRepository, 'getById').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.update(mockUpdateClientParams())).rejects.toThrow();
    });

    test('Should throw if clientRepository.update throws', async () => {
      vi.spyOn(mockClientRepository, 'update').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.update(mockUpdateClientParams())).rejects.toThrow();
    });
  });

  describe('delete()', () => {
    test('Should call clientRepository.getById with correct values', async () => {
      const getByIdSpy = vi.spyOn(mockClientRepository, 'getById');
      const id = 1;
      const userId = 2;

      await sut.delete(id, userId);

      expect(getByIdSpy).toHaveBeenCalledWith(id, userId);
    });

    test('Should throw NotFound error if clientRepository.getById returns null', async () => {
      vi.spyOn(mockClientRepository, 'getById').mockResolvedValueOnce(null);

      expect(sut.delete(1, 2)).rejects.toThrow(NotFound);
    });

    test('Should throw if clientRepository.getById throws', async () => {
      vi.spyOn(mockClientRepository, 'getById').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(sut.delete(1, 2)).rejects.toThrow();
    });

    test('Should call clientRepository.delete with correct values', async () => {
      const deleteSpy = vi.spyOn(mockClientRepository, 'delete');
      const id = 1;
      const userId = 2;

      await sut.delete(id, userId);

      expect(deleteSpy).toHaveBeenCalledWith(id, userId);
    });

    test('Should throw if clientRepository.delete throws', async () => {
      vi.spyOn(mockClientRepository, 'delete').mockImplementationOnce(() => {
        throw new Error();
      });
      expect(sut.delete(1, 2)).rejects.toThrow();
    });
  });
});
