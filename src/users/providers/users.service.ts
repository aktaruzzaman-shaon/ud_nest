import { Injectable } from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-param.dto';

@Injectable()
export class UserService {
  public findAll(
    getUsersParamDto: GetUsersParamDto,
    limit: number,
    page: number,
  ) {
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

  public findOneByIdid(id: number) {
    return {
      firstName: 'John',
      lastName: 'Doe',
      email: 'a@gmail.com',
    };
  }
}
