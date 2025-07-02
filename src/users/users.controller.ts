import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { get } from 'http';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/path-users.dto';
import path from 'path';
import { UserService } from './providers/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  // You can inject services here if needed, e.g., private readonly userService: User

  @Get('/:id')
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe)
    limit: number,
    @Query('page', new DefaultValuePipe(10), ParseIntPipe)
    page: number,

    // @Param('optional') optional?: string,
  ) {
    return this.userService.findAll(getUsersParamDto, limit, page);
  }

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto) {
    console.log(typeof createUserDto);
    console.log(createUserDto);
    return 'Yoeu have created a new user';
  }

  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
