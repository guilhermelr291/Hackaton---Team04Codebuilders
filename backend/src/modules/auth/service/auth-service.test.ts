import { beforeEach, describe, expect, test, vi } from 'vitest';
import { UserRepository } from '../../user/repository/user-repository';
import { AuthService, LoginParams, SignUpParams } from './auth-service';
import { User } from '@prisma/client';
import { UnauthorizedError } from '../../../common/errors/http-errors';
import { HashComparer } from '../protocols/hash-comparer';
import { Hasher } from '../protocols/hasher';
import { Encrypter } from '../protocols/encrypter';

const mockSignUpParams = (): SignUpParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
  confirmPassword: 'any_password',
  name: 'any_name',
});
const mockLoginParams = (): LoginParams => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const mockUserModel = (): User => ({
  id: 1,
  email: 'any_email',
  password: 'any_password',
  name: 'any_name',
});

const mockUserRepository = {
  getByEmail: vi.fn(),
  create: vi.fn(),
} as unknown as UserRepository;

class EncrypterStub implements Encrypter {
  encrypt(data: {}): string {
    return 'encrypted value';
  }
}

class HasherStub implements Hasher {
  async hash(value: string): Promise<string> {
    return 'hashed_password';
  }
}

class HashComparerStub implements HashComparer {
  async compare(value: string, valueToCompare: string): Promise<boolean> {
    return new Promise(resolve => resolve(true));
  }
}

describe('AuthService', () => {
  let sut: AuthService;
  const hasherStub = new HasherStub();
  const hashComparerStub = new HashComparerStub();
  const encrypterStub = new EncrypterStub();

  beforeEach(() => {
    vi.clearAllMocks();

    sut = new AuthService(
      mockUserRepository,
      hasherStub,
      hashComparerStub,
      encrypterStub
    );
  });

  describe('signUp', () => {
    test('Should call UserRepository.getByEmail with correct value', async () => {
      const getByEmailSpy = vi.spyOn(mockUserRepository, 'getByEmail');

      await sut.signUp(mockSignUpParams());

      expect(getByEmailSpy).toHaveBeenCalledWith(mockSignUpParams().email);
    });
    test('ensure AuthService throws if UserRepository.getByEmail returns a user', async () => {
      vi.spyOn(mockUserRepository, 'getByEmail').mockResolvedValueOnce(
        mockUserModel()
      );

      expect(sut.signUp(mockSignUpParams())).rejects.toThrow();
    });
    test('Should call UserRepository.create with correct values', async () => {
      const createSpy = vi.spyOn(mockUserRepository, 'create');

      let signUpParams = mockSignUpParams();

      await sut.signUp(signUpParams);

      signUpParams.password = 'hashed_password';

      expect(createSpy).toHaveBeenCalledWith(signUpParams);
    });
    test('Should call Hasher with correct value', async () => {
      const hashSpy = vi.spyOn(hasherStub, 'hash');

      const signUpParams = mockSignUpParams();

      await sut.signUp(signUpParams);

      expect(hashSpy).toHaveBeenCalledWith(signUpParams.password);
    });
    test('Should throw if UserRepository.getByEmail throws', async () => {
      vi.spyOn(mockUserRepository, 'getByEmail').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.signUp(mockSignUpParams())).rejects.toThrow();
    });
    test('Should throw if Hasher throws', async () => {
      vi.spyOn(hasherStub, 'hash').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.signUp(mockSignUpParams())).rejects.toThrow();
    });

    test('Should throw if UserRepository.create throws', async () => {
      vi.spyOn(mockUserRepository, 'create').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.signUp(mockSignUpParams())).rejects.toThrow();
    });
  });

  describe('login', () => {
    beforeEach(() => {
      vi.spyOn(mockUserRepository, 'getByEmail').mockResolvedValueOnce(
        mockUserModel()
      );
    });

    test('Should call UserRepository.getByEmail with correct value', async () => {
      const getByEmailSpy = vi.spyOn(mockUserRepository, 'getByEmail');

      await sut.login(mockLoginParams());

      expect(getByEmailSpy).toHaveBeenCalledWith(mockLoginParams().email);
    });

    test('Should throw UnauthorizedError if userRepository.getByEmail returns null', async () => {
      vi.spyOn(mockUserRepository, 'getByEmail').mockResolvedValueOnce(null);

      expect(sut.login(mockLoginParams())).rejects.toThrow(UnauthorizedError);
    });

    test('Should call HashComparer with correct values', async () => {
      const compareSpy = vi.spyOn(hashComparerStub, 'compare');

      const loginParams = mockLoginParams();

      const userModel = mockUserModel();

      await sut.login(loginParams);

      expect(compareSpy).toHaveBeenCalledWith(
        loginParams.password,
        userModel.password
      );
    });

    test('Should throw UnauthorizedError if HashComparer returns false', async () => {
      vi.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false);

      expect(sut.login(mockLoginParams())).rejects.toThrow(UnauthorizedError);
    });

    test('Should call Encrypter with correct value', async () => {
      const encodeSpy = vi.spyOn(encrypterStub, 'encrypt');

      await sut.login(mockLoginParams());

      expect(encodeSpy).toHaveBeenCalledWith({ id: mockUserModel().id });
    });

    test('Should return token and user on success', async () => {
      const result = await sut.login(mockLoginParams());

      expect(result).toStrictEqual({
        token: 'encrypted value',
        user: {
          id: 1,
          email: 'any_email',
          name: 'any_name',
        },
      });
    });

    test('Should throw if HashComparer throws', async () => {
      vi.spyOn(hashComparerStub, 'compare').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.login(mockLoginParams())).rejects.toThrow();
    });
    test('Should throw if UserRepository throws', async () => {
      vi.spyOn(mockUserRepository, 'getByEmail').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.login(mockLoginParams())).rejects.toThrow();
    });
    test('Should throw if Encrypter throws', async () => {
      vi.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
        throw new Error();
      });

      expect(sut.login(mockLoginParams())).rejects.toThrow();
    });
  });
});
