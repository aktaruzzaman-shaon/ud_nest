import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get('/:id/{:optional}')
  public getUsers(
    @Param() param: any,
    @Query() query: any,
    @Param('optional') optional?: string,
  ) {
    console.log(param, query, optional);
    return 'This action returns all users';
  }

  @Post()
  public createUser(@Body() body: any) {
    console.log(body);
    return 'Yoeu have created a new user';
  }
}
