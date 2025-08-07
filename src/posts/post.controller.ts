import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  // Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchhPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import { ActiveUserData } from 'src/auth/interfaces/active-userData.interface';

@Controller('posts')
export class PostsController {
  constructor(
    /*
     *  Injecting Posts Service
     */
    private readonly postsService: PostsService,
  ) {}

  // get request--------------------------------------
  @Get('/:userId')
  public getPosts(
    @Param('userId') userId: string,
    @Query() postQuery: GetPostsDto,
  ) {
    return this.postsService.findAll(postQuery, userId);
  }

  // post request-----------------------------------
  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You have get 201 response so this is success',
  })
  @Post()
  public createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    console.log(user);
    return this.postsService.create(createPostDto, user);
  }

  // Patch request----------------------------------
  // post request-----------------------------------
  @ApiOperation({
    summary: 'Update a new blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'You have get 200 response so this is success udapte post',
  })
  @Patch()
  public updatePost(@Body() patchhPostDto: PatchhPostDto) {
    return this.postsService.update(patchhPostDto);
  }

  // delete post
  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
