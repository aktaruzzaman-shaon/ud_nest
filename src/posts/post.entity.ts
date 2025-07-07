import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './dtos/postStatus.enum';
import { CreatePostMetaOptionsDto } from './dtos/create-post-metaOptions.dto';

@Entity()
export class Post {
    
  @PrimaryGeneratedColumn()
  id: number;

  title: string;

  postType: postType;

  slug: string;

  status: postStatus;

  content?: string;

  schema?: string;

  featureImageUrl?: string;

  publishOn?: Date;

  tags?: string[];

  metaOptions?: CreatePostMetaOptionsDto[];
}
