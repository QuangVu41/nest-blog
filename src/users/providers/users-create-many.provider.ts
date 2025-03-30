import {
  ConflictException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUsersDto } from '../dtos/create-may-users.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createMany(createManyUsersDto: CreateManyUsersDto) {
    const newUsers: User[] = [];
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch (err) {
      throw new RequestTimeoutException(
        'Connect to database failed or start transaction failed',
      );
    }

    try {
      for (const user of createManyUsersDto.users) {
        const newUser = this.dataSource.manager.create(User, user);
        const createdUser = await queryRunner.manager.save(newUser);
        newUsers.push(createdUser);
      }
      await queryRunner.commitTransaction();

      return { users: newUsers };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description: JSON.stringify(err),
      });
    } finally {
      try {
        await queryRunner.release();
      } catch (err) {
        throw new RequestTimeoutException('Could not release the connection', {
          description: JSON.stringify(err),
        });
      }
    }
  }
}
