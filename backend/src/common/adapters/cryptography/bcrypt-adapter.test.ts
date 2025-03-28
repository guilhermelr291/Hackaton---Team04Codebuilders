import { beforeEach, describe, expect, test, vi } from 'vitest';
import bcrypt, { compare } from 'bcrypt';
import { BcryptAdapter } from './bcrypt-adapter';
vi.mock('bcrypt', () => ({
  default: {
    hash: vi.fn().mockResolvedValue('hashed_value'),
    genSalt: vi.fn().mockResolvedValue('any_salt'),
    compare: vi.fn().mockResolvedValue(true),
  },
}));

describe('BcryptAdapter', () => {
  let sut: BcryptAdapter;
  beforeEach(() => {
    vi.clearAllMocks();

    sut = new BcryptAdapter(12);
  });

  describe('hash', () => {
    test('Should call bcrypt hash method with correct value', async () => {
      await sut.hash('any_value');

      expect(bcrypt.hash).toHaveBeenCalledWith('any_value', 'any_salt');
    });

    test('Should throw if bcrypt throws', () => {
      vi.mocked(bcrypt.hash).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.hash('any_value')).rejects.toThrow();
    });
    test('Should return hashed value', async () => {
      const result = await sut.hash('any_value');

      expect(result).toBe('hashed_value');
    });
  });
  describe('compare', () => {
    test('Should call bcrypt compare method with correct values', async () => {
      const value = 'any_value';
      const valueToCompare = 'another_value';
      await sut.compare(value, valueToCompare);

      expect(bcrypt.compare).toHaveBeenCalledWith(value, valueToCompare);
    });

    test('Should throw if bcrypt throws', () => {
      vi.mocked(bcrypt.compare).mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.compare('value', 'valueToCompare')).rejects.toThrow();
    });
    test('Should return true on success', async () => {
      const result = await sut.compare('value', 'value');

      expect(result).toBe(true);
    });
    test('Should return false on failure', async () => {
      vi.mocked(bcrypt.compare).mockImplementationOnce(() => false);

      const result = await sut.compare('value', 'value');

      expect(result).toBe(false);
    });
  });
});
