import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('users')
export class UsersController {
  @Get('/:id')
  public getUsers(
    @Param('id', ParseIntPipe) id: number | undefined,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe)
    limit: number | undefined,
    @Query('page', new DefaultValuePipe(10), ParseIntPipe)
    page: number | undefined,

    // @Param('optional') optional?: string,
  ) {
    console.log(page, id, limit);
    return 'This action returns all users';
  }

  @Post()
  public createUser(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'Yoeu have created a new user';
  }
}
