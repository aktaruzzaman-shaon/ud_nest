import { Body, Injectable, Post } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class CreatePostProvider {

    constructor(
         private readonly usersService: UserService,
        
            @InjectRepository(Post)
            private readonly postsRepository: Repository<Post>,
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
}
