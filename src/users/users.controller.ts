/* eslint-disable @typescript-eslint/no-unused-vars */
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
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { get } from 'http';
import { GetUsersParamDto } from './dtos/get-users-param.dto';
import { PatchUserDto } from './dtos/path-users.dto';
import path from 'path';
import { UserService } from './providers/users.service';
import {
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateManyUserDto } from './dtos/create-many-user.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  // You can inject services here if needed, e.g., private readonly userService: User

  @Get('/:id')
  @ApiOperation({
    summary: 'Get a user by ID',
    description: 'Fetches a user based on the provided ID parameter.',
  })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'The ID of the user to retrieve',
    example: 154464,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'User found successfully.',
    type: GetUsersParamDto,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Limit the number of users returned',
    example: 50,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'page the number of users returned',
    example: 50,
  })
  public getUsers(
    @Param() getUsersParamDto: GetUsersParamDto,
    @Query('limit', new DefaultValuePipe(50), ParseIntPipe)
    limit: number,
    @Query('page', new DefaultValuePipe(10), ParseIntPipe)
    page: number,

    // @Param('optional') optional?: string,
  ) {
    const userId = getUsersParamDto.id ?? 0;
    return this.userService.findAll(getUsersParamDto, limit, page);
  }

  @Post()
  @Auth(AuthType.None)
  @SetMetadata('authType', 'none')
  public createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createuser(createUserDto);
  }

  @Post('/create-many')
  public createManyUsers(@Body() createManyUserDto: CreateManyUserDto) {
    console.log('createManyUserDto', createManyUserDto);
    // return this.userService.createMany(create
    return this.userService.createMany(createManyUserDto);
  }

  @Patch()
  public updateUser(@Body() patchUserDto: PatchUserDto) {
    return patchUserDto;
  }
}
