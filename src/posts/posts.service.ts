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

    //find author from database based on authorId
    

    //create metaoption
    // const metaOptions = createPostDto.metaOptions
    //   ? this.metaOptionsRepository.create(createPostDto.metaOptions)
    //   : null;
    // if (metaOptions) {
    //   await this.metaOptionsRepository.save(metaOptions);
    // }

    //create post
    let post = this.postsRepository.create(createPostDto);

    //add metaoptions
    // if (metaOptions) {
    //   post.metaOptions = metaOptions;
    // }

    return await this.postsRepository.save(post);
  }

  // findall method
  public async findAll() {
    // const user = this.usersService.findOneById(userId);
    let posts = await this.postsRepository.find();

    return posts;
  }

  // delete method

  public async delete(id: number) {
    //find the post
    await this.postsRepository.delete({ id });

    // await this.postsRepository.delete(id);
    // if (post?.metaOptions?.id) {
    //   await this.metaOptionsRepository.delete(post.metaOptions.id);
    // }
    // if (post?.metaOptions?.id) {
    //   let ivnerserPost = await this.metaOptionsRepository.find({
    //     where: { id: post.metaOptions.id },
    //     relations: {
    //       post: true,
    //     },
    //   });

    //   console.log(ivnerserPost);
    // }

    return { delted: true, id: id };
  }
}
