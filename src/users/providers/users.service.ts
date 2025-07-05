import { Injectable } from '@nestjs/common';
// import { GetUsersParamDto } from '../dtos/get-users-param.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    //injecting repository is not needed here as this is a mock service
  }
  // public findAll(
  //   getUsersParamDto: GetUsersParamDto,
  //   limit: number,
  //   page: number,
  // ) {
  //   return [
  //     {
  //       firstName: 'John',
  //       lastName: 'Doe',
  //       email: 'shaon@gmail.com',
  //     },
  //     {
  //       firstName: 'Jane',
  //       lastName: 'Doe',
  //       email: 'a@gmail.com',
  //     },
  //   ];
  // }

  public findOneByIdid(id: number) {
    console.log('id', id);
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'a@gmail.com',
    };
  }

  public async createuser(createUserDto: CreateUserDto) {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });
    let newUser = this.usersRepository.create(createUserDto);
    newUser = await this.usersRepository.save(newUser);
    return newUser;
  }
}
