import {
  Body,
  Controller,
  Delete,
  Get,
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

@Controller('posts')
export class PostsController {
  constructor(
    /*
     *  Injecting Posts Service
     */
    private readonly postsService: PostsService,
  ) {}

  // get request--------------------------------------
  @Get()
  public getPosts() {
    return this.postsService.findAll();
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
  public createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
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
  public updatePost(@Body() patchhPostDto: PatchhPostDto) {
    return this.postsService.update(patchhPostDto);
  }

  // delete post
  @Delete()
  public deletePost(@Query('id', ParseIntPipe) id: number) {
    return this.postsService.delete(id);
  }
}
