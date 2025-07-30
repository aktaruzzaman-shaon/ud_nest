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
  Req,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PatchhPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

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
  public createPost(@Req() request:any /**@Body() createPostDto: CreatePostDto*/) {
    console.log(request[REQUEST_USER_KEY], "request");
    // console.log(createPostDto);
    // return this.postsService.create(createPostDto);
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
