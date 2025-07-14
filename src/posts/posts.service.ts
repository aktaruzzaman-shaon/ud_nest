/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    //create metaoption
    const metaOptions = createPostDto.metaOptions
      ? this.metaOptionsRepository.create(createPostDto.metaOptions)
      : null;
    if (metaOptions) {
      await this.metaOptionsRepository.save(metaOptions);
    }
    console.log(metaOptions);
    //create post
    let post = this.postsRepository.create(createPostDto);

    //add metaoptions
    if (metaOptions) {
      post.metaOptions = metaOptions;
    }

    return await this.postsRepository.save(post);
  }

  public findAll(userId: number) {
    const user = this.usersService.findOneById(userId);

    return [
      {
        user: user,
        title: 'Test Tile',
        content: 'Test Content',
      },
      {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        user: user,
        title: 'Test Tile 2',
        content: 'Test Content 2',
      },
    ];
  }
}
