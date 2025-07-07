import { Body, Controller, Patch, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { create } from 'domain';
import { CreatePostDto } from './dtos/create-post.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { patchhPostDto } from './dtos/patch-post.dto';

@Controller('posts')
export class PostsController {
  constructor(
    /*
     *  Injecting Posts Service
     */
    private readonly postsService: PostsService,
  ) {}

  // post request-----------------------------------
  @ApiOperation({
    summary: 'Create a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You have get 201 response so this is success',
  })
  @Post()
  public createPost(@Body() createPostDto: CreatePostDto) {
    console.log(createPostDto);
  }

  // Patch request-----------------------------------
  // post request-----------------------------------
  @ApiOperation({
    summary: 'Update a new blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'You have get 200 response so this is success udapte post',
  })
  @Patch()
  public updatePost(@Body() patchhPostDto: patchhPostDto) {
    console.log(patchhPostDto);
  }
}
