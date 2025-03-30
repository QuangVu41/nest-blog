import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserProvider } from './create-user.provider';
import { MailService } from 'src/mail/providers/mail.service';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { ObjectLiteral, Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { PostsModule } from 'src/posts/posts.module';

type MockRepository<T extends ObjectLiteral> = Partial<
  Record<keyof Repository<T>, jest.Mock>
>;
const createMockRepository = <
  T extends ObjectLiteral,
>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('CreateUserProvider', () => {
  let provider: CreateUserProvider;
  let usersRepository: MockRepository<User>;
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    password: 'password',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateUserProvider,
        {
          provide: MailService,
          useValue: {
            sendUserWelcome: jest.fn(() => Promise.resolve()),
          },
        },
        {
          provide: HashingProvider,
          useValue: {
            hashPassword: jest.fn(() => Promise.resolve(user.password)),
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: createMockRepository(),
        },
      ],
    }).compile();

    provider = module.get(CreateUserProvider);
    usersRepository = module.get(getRepositoryToken(User));
  });

  it('Should be defined', () => {
    expect(provider).toBeDefined();
  });

  describe('createUser', () => {
    describe('When user does not exist', () => {
      it('Should create a new user', async () => {
        usersRepository.findOne?.mockReturnValue(null);
        usersRepository.create?.mockReturnValue(user);
        usersRepository.save?.mockReturnValue(user);
        await provider.createUser(user);

        expect(usersRepository.findOne).toHaveBeenCalledWith({
          where: {
            email: user.email,
          },
        });
        expect(usersRepository.create).toHaveBeenCalledWith(user);
        expect(usersRepository.save).toHaveBeenCalledWith(user);
      });
    });
    describe('When user exists', () => {
      it('Throw a BadRequestException', async () => {
        usersRepository.findOne?.mockReturnValue(user);
        usersRepository.create?.mockReturnValue(user);
        usersRepository.save?.mockReturnValue(user);
        try {
          await provider.createUser(user);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
        }
      });
    });
  });
});
