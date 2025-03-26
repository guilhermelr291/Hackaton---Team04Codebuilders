import { vi, test, describe, expect, beforeEach } from 'vitest';

import { ClientRepository } from './client-repository';
import prisma from '../../../prisma/db';

vi.mock('../../../prisma/db', () => ({
  default: {
    client: {
      findUnique: vi.fn().mockResolvedValue({
        id: 1,
        name: 'any_name',
        email: 'any_email@mail.com',
      }),
    },
  },
}));

const mockClient = () => ({
  id: 1,
  name: 'any_name',
  email: 'any_email@mail.com',
});

describe('ClientRepository', () => {
  let clientRepository: ClientRepository;

  beforeEach(() => {
    clientRepository = new ClientRepository();
    // Clear all mocks before each test
    vi.clearAllMocks();
  });

  describe('getById', () => {
    test('Should call prisma.client.findUnique with correct value', async () => {
      const id = 1;
      await clientRepository.getById(id);

      expect(prisma.client.findUnique).toHaveBeenCalledWith({ where: { id } });
    });

    test('Should return a client if client exists', async () => {
      const result = await clientRepository.getById(1);

      expect(result).toEqual(mockClient());
    });
  });
});
