// #Esse arquivo foi criado com o auxílio de IA

import { vi, test, describe, expect, beforeEach } from 'vitest';
import { ClientRepository } from './client-repository';
import prisma from '../../../prisma/db';
import {
  CreateClientParams,
  UpdateClientParams,
} from '../service/client-service';

vi.mock('../../../prisma/db', () => ({
  default: {
    client: {
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
        userId: 1,
        phone: '1234567890',
      }),
      create: vi.fn().mockResolvedValue({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
        userId: 1,
        phone: '1234567890',
      }),
      update: vi.fn().mockResolvedValue({
        id: 1,
        name: 'updated_name',
        email: 'any_email@mail.com',
        userId: 1,
        phone: '1234567890',
      }),
      delete: vi.fn(),
      findMany: vi.fn().mockResolvedValue([
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
    },
  },
}));

const mockClient = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
  userId: 1,
  phone: '1234567890',
});

const mockUpdatedClient = () => ({
  id: 1,
  name: 'updated_name',
  email: 'any_email@mail.com',
  userId: 1,
  phone: '1234567890',
});

const mockClients = () => [
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
];

const mockCreateClientParams = (): CreateClientParams => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  userId: 1,
  phone: '1234567890',
});

const mockUpdateClientParams = (): UpdateClientParams => ({
  id: 1,
  name: 'updated_name',
  userId: 1,
  email: 'any_email@mail.com',
  phone: '1234567890',
});

describe('ClientRepository', () => {
  let sut: ClientRepository;

  beforeEach(() => {
    sut = new ClientRepository();

    vi.clearAllMocks();
  });

  describe('getById', () => {
    test('Should call prisma.client.findUnique with correct value', async () => {
      const id = 1;
      const userId = 1;
      await sut.getById(id, userId);

      expect(prisma.client.findUnique).toHaveBeenCalledWith({
        where: { id, userId },
      });
    });

    test('Should return a client on success', async () => {
      const id = 1;
      const userId = 1;
      const result = await sut.getById(id, userId);

      expect(result).toEqual(mockClient());
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.client.findUnique).mockImplementationOnce(() => {
        throw new Error();
      });
      const id = 1;
      const userId = 1;
      expect(sut.getById(id, userId)).rejects.toThrow();
    });
  });

  describe('create', () => {
    test('Should call prisma.client.create with correct params', async () => {
      const createClientParams = mockCreateClientParams();

      await sut.create(createClientParams);

      expect(prisma.client.create).toHaveBeenCalledWith({
        data: createClientParams,
      });
    });

    test('Should return created client on success', async () => {
      const result = await sut.create(mockCreateClientParams());

      expect(result).toStrictEqual(mockClient());
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.client.create).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.create(mockCreateClientParams())).rejects.toThrow();
    });
  });

  describe('update', () => {
    test('Should call prisma.client.update with correct params', async () => {
      const updateClientParams = mockUpdateClientParams();

      await sut.update(updateClientParams);

      const { id, userId, ...clientData } = updateClientParams;

      expect(prisma.client.update).toHaveBeenCalledWith({
        where: { id, userId },
        data: clientData,
      });
    });

    test('Should return updated client on success', async () => {
      const result = await sut.update(mockUpdateClientParams());

      expect(result).toStrictEqual(mockUpdatedClient());
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.client.update).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.update(mockUpdateClientParams())).rejects.toThrow();
    });
  });

  describe('delete', () => {
    test('Should call prisma.client.delete with correct values', async () => {
      const id = 1;
      const userId = 2;
      await sut.delete(id, userId);

      expect(prisma.client.delete).toHaveBeenCalledWith({
        where: { id, userId },
      });
    });

    test('Should throw if prisma throws', async () => {
      vi.mocked(prisma.client.delete).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.delete(1, 2)).rejects.toThrow();
    });
  });

  describe('getUserClients', () => {
    test('Should call prisma.client.findMany with correct value', async () => {
      const userId = 1;
      await sut.getUserClients(userId);

      expect(prisma.client.findMany).toHaveBeenCalledWith({
        where: { userId },
      });
    });

    test('Should return correct clients', async () => {
      const userId = 1;
      const result = await sut.getUserClients(userId);

      expect(result).toStrictEqual(mockClients());
    });

    test('Should throw if prisma throws', async () => {
      const userId = 1;
      vi.mocked(prisma.client.findMany).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.getUserClients(userId)).rejects.toThrow();
    });
  });
});
