/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, Injectable } from '@nestjs/common';
import { UserService } from 'src/users/providers/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchhPostDto } from './dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UserService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,

    private readonly tagsService: TagsService,
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
  public async findAll() {
    // const user = this.usersService.findOneById(userId);
    let posts = await this.postsRepository.find({
      relations: {
        // tags: true,
        // metaOptions: true,
        // author: true,
        // eslint-disable-next-line prettier/prettier
      }
    });

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
    //find the tags
    let tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    //find the post
    let newpost = await this.postsRepository.findOneBy({
      id: patchPostDto.id,
    });

    if (!newpost) {
      throw new Error('Post not found');
    }

    // Update post related properties
    newpost.title = patchPostDto.title ?? newpost.title;
    newpost.content = patchPostDto.content ?? newpost.content;
    newpost.status = patchPostDto.status ?? newpost.status;
    newpost.postType = patchPostDto.postType ?? newpost.postType;
    newpost.slug = patchPostDto.slug ?? newpost.slug;
    newpost.featuredImageUrl =
      patchPostDto.featuredImageUrl ?? newpost.featuredImageUrl;
    newpost.publishOn = patchPostDto.publishOn ?? newpost.publishOn;

    //assign the new tags
    newpost.tags = tags;

    //save the post and return it
    return await this.postsRepository.save(newpost);
  }
}
