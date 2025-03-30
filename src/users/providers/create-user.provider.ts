import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserProvider {
  constructor(
    private readonly mailService: MailService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    try {
      // Check if user already exists with the same email
      const existingUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      // Handle error
      if (existingUser)
        throw new BadRequestException(
          'The user already exists, please change your email',
        );

      // Create a new user
      let newUser = this.usersRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(
          createUserDto.password,
        ),
      });

      newUser = await this.usersRepository.save(newUser);

      await this.mailService.sendUserWelcome(newUser);

      return newUser;
    } catch (err) {
      console.log(err);
      if (err instanceof BadRequestException) throw err;

      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error  connecting to the database',
        },
      );
    }
  }
}
