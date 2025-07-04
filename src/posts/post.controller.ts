import { Body, Controller, Post } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(
    /*
     *  Injecting Posts Service
     */
    private readonly postsService: PostsService,
  ) {}
  @Post()
  public createPost(@Body createPostDto: CreatePostDto) {}
}
