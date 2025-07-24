import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { User } from '../user.entity';
import { DataSource } from 'typeorm';
import { CreateManyUserDto } from '../dtos/create-many-user.dto';

@Injectable()
export class UsersCreateManyProvider {
  constructor(
    // Inject datasource
    private readonly dataSource: DataSource,
  ) {}

  public async createMany(createManyUserDto: CreateManyUserDto) {
    const newUsers: User[] = [];
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: any) {
      throw new RequestTimeoutException("Couldn't connect to the database");
    }

    try {
      for (const user of createManyUserDto.users) {
        const newUser = queryRunner.manager.create(User, user as Partial<User>);
        const result = await queryRunner.manager.save(newUser);
        newUsers.push(result);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      await queryRunner.commitTransaction();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.error('Error creating users:', error);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return newUsers;
  }
}
