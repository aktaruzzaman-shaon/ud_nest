import { Injectable } from '@nestjs/common';
// import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly configServcie: ConfigService, // This is not needed in this mock service, but kept for structure
  ) {
    //injecting repository is not needed here as this is a mock service
  }

  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
    const environment = this.configServcie.get<string>('S3_BUCKET');
    console.log('Environment:', environment);
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
    return await this.usersRepository.findOneBy({
      id,
    });
  }

  public async createuser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    console.log(existingUser);
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }
}
