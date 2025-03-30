import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserProvider } from './create-user.provider';
import { FindOneByGoogleIdProvider } from './find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';
import { CreateGoogleUserProvider } from './create-google-user.provider';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let usersService: UsersService;

  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 12,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: CreateUserProvider, useValue: mockCreateUserProvider },
        { provide: DataSource, useValue: {} },
        { provide: getRepositoryToken(User), useValue: {} },
        { provide: CreateUserProvider, useValue: {} },
        { provide: FindOneByGoogleIdProvider, useValue: {} },
        { provide: FindOneUserByEmailProvider, useValue: {} },
        { provide: CreateGoogleUserProvider, useValue: {} },
        { provide: UsersCreateManyProvider, useValue: {} },
        UsersService,
      ],
    }).compile();

    usersService = module.get(UsersService);
  });

  it('Should be defined', () => {
    expect(usersService).toBeDefined();
  });

  describe('createUser', () => {
    it('Should be defined', () => {
      expect(usersService.createUser).toBeDefined();
    });

    it('Should call createUser on createUserProvider', async () => {
      const user = await usersService.createUser({
        firstName: 'Quang Vu',
        lastName: 'Truong',
        email: 'quangvu@gmail.com',
        password: 'testing',
      });
      console.log(user.firstName);
      expect(user.firstName).toEqual('Quang Vu');
    });
  });
});
