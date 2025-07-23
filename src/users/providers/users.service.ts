/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
// import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { DataSource, Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService, ConfigType } from '@nestjs/config';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @Inject(profileConfig.KEY)
    private readonly profileConfiguration: ConfigType<typeof profileConfig>,
    private readonly configServcie: ConfigService,

    // Inject datasource
    private readonly dataSource: DataSource,
    private readonly UsersCreateManyProvider: UsersCreateManyProvider,
  ) {
    //injecting repository is not needed here as this is a mock service
  }

  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    // const environment = this.configServcie.get<string>('S3_BUCKET');
    // console.log('Environment:', environment);

    // test the new config
    throw new HttpException(
      {
        status: HttpStatus.MOVED_PERMANENTLY,
        error: 'The api endpoint does not exist',
        fileName: 'users.service.ts',
        lineNumber: 45,
      },
      HttpStatus.MOVED_PERMANENTLY,
      {
        cause: new Error(),
        description: "Occured because the endpoint doesn't exist",
      },
    );
    return [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'shaon@gmail.com',
      },
      {
        firstName: 'Jane',
        lastName: 'Doe',
        email: 'a@gmail.com',
      },
    ];
  }

  public async findOneById(id: number) {
    let user: any;
    try {
      user = await this.usersRepository.findOneBy({
        id,
      });
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process the request. Please try again later.',
        {
          description: 'Database connection error',
        },
      );
    }

    if (!user) {
      throw new BadRequestException('The user does not exist with this id.');
    }

    return await this.usersRepository.findOneBy({
      id,
    });
  }

  // create user =========================================================
  public async createuser(createUserDto: CreateUserDto) {
    let existingUser: any;
    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
      // eslint-disable-next-line prettier/prettier
    } catch (error:any) {
      throw new RequestTimeoutException(
        'Unable to process the request. Please try again later.',
        {
          description: 'Database connection error',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'The user already exists with this email address.',
      );
    }
    let newUser = this.usersRepository.create(createUserDto);

    try {
      newUser = await this.usersRepository.save(newUser);
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process the request. Please try again later.',

        {
          description: 'Database connection error',
        },
      );
    }
    return newUser;
  }

  // create many user ========================================================
  public async createMany(createUserDto: CreateUserDto[]) {
    return await this.UsersCreateManyProvider.createMany(createUserDto);
    // const newUsers: User[] = [];
    // const queryRunner = this.dataSource.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.startTransaction();
    // try {
    //   for (const user of createUserDto) {
    //     const newUser = queryRunner.manager.create(User, user);
    //     const result = await queryRunner.manager.save(newUser);
    //     newUsers.push(result);
    //   }
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    //   await queryRunner.commitTransaction();
    // } catch (error) {
    //   await queryRunner.rollbackTransaction();
    // } finally {
    //   await queryRunner.release();
    // }
  }
}
