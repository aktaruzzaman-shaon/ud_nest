/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prefer-const */

import {
  BadRequestException,
  Body,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchhPostDto } from './dtos/patch-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/pagination.interface';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    private readonly tagsService: TagsService,

    private readonly paginattionProvider: PaginationProvider,
  ) {}

  public async create(@Body() createPostDto: CreatePostDto) {
    //find author from database based on authorId
    let author = await this.usersService.findOneById(createPostDto.authorId);
    //find tags
    let tags = await this.tagsService.findMultipleTags(createPostDto.tags);

    //create metaoption
    // const metaOptions = createPostDto.metaOptions
    //   ? this.metaOptionsRepository.create(createPostDto.metaOptions)
    //   : null;
    // if (metaOptions) {
    //   await this.metaOptionsRepository.save(metaOptions);
    // }

    //create post
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author === null ? undefined : author,
      tags: tags,
    });

    //add metaoptions
    // if (metaOptions) {

    //   post.metaOptions = metaOptions;
    // }

    return await this.postsRepository.save(post);
  }

  // findall method
  public async findAll(
    postQuery: GetPostsDto,
    userId: string,
  ): Promise<Paginated<Post>> {
    let posts = await this.paginattionProvider.paginateQuery(
      {
        limit: postQuery.limit,
        page: postQuery.page,
      },
      this.postsRepository,
    );

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

  // update post

  public async update(patchPostDto: PatchhPostDto) {
    let tags: any;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let newpost;
    //find the tags
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process the request. Please try again later.',
      );
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!tags || tags.length !== patchPostDto.tags?.length) {
      throw new BadRequestException('Please check your tag ID and try again');
    }
    //   throw new RequestTimeoutException(
    //     'Unable to process the request. Please try again later.',
    //     {
    //       description: 'Tags not found',
    //     },
    //   );
    // }

    // Find the Post
    try {
      // Returns null if the post does not exist
      newpost = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }

    if (!newpost) {
      throw new NotFoundException('Post not found');
    }

    // Update post related properties
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    newpost.title = PatchhPostDto.title ?? newpost.title;
    newpost.content = PatchhPostDto.content ?? newpost.content;
    newpost.status = PatchhPostDto.status ?? newpost.status;
    newpost.postType = PatchhPostDto.postType ?? newpost.postType;
    newpost.slug = PatchhPostDto.slug ?? newpost.slug;
    newpost.featuredImageUrl =
      PatchhPostDto.featuredImageUrl ?? newpost.featuredImageUrl;
    newpost.publishOn = PatchhPostDto.publishOn ?? newpost.publishOn;

    //assign the new tags
    newpost.tags = tags;

    try {
      await this.postsRepository.save(newpost);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new RequestTimeoutException(
        'Unable to save the post. Please try again later.',
      );
    }
    //save the post and return it
    return newpost;
  }
}
