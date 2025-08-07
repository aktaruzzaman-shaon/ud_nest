import {
  BadRequestException,
  Body,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { ActiveUserData } from 'src/auth/interfaces/active-userData.interface';
// import { Post } from '../entities/post.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UserService,

    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    private readonly tagsService: TagsService, // Assuming tagsService is similar to usersService
  ) {}
  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    let author = undefined;
    let tags = undefined;
    try {
      //find author from database based on authorId
      author = await this.usersService.findOneById(user.sub);
      //find tags
      tags = await this.tagsService.findMultipleTags(createPostDto.tags);
    } catch (error) {
      throw new ConflictException(error);
    }

    if (createPostDto.tags?.length !== tags.length) {
      throw new BadRequestException('Pleade check your tags');
    }

    //create metaoption
    // const metaOptions = createPostDto.metaOptions
    //   ? this.metaOptionsRepository.create(createPostDto.metaOptions)
    //   : null;
    // if (metaOptions) {
    //   await this.metaOptionsRepository.save(metaOptions);
    // }

    //create post
    const post = this.postsRepository.create({
      ...createPostDto,
      author: author === null ? undefined : author,
      tags: tags,
    });

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new ConflictException(error, {
        description: 'Ensure the post slug is unique.',
      });
    }

    //add metaoptions
    // if (metaOptions) {

    //   post.metaOptions = metaOptions;
    // }
  }
}
