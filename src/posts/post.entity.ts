/* eslint-disable prettier/prettier */
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { postType } from './enums/postType.enum';
import { postStatus } from './dtos/postStatus.enum';
// import { CreatePostMetaOptionsDto } from '../meta-options/dtos/create-post-metaOptions.dto';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { User } from 'src/users/user.entity';
import { Tag } from 'src/tags/tag.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

 @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

   @Column({
    type: 'enum',
    enum: postType,
    nullable: false,
    default: postType.POST,
  })
  postType: postType;

  @Column({
    type: 'varchar',
    length: 256,
    nullable: false,
    unique: true,
  })
  slug: string;
  
  @Column({
    type: 'enum',
    enum: postStatus,
    nullable: false,
    default: postStatus.DRAFT,
  })
  status: postStatus;

   @Column({
    type: 'text',
    nullable: true,
  })
  content?: string;


  @Column({
    type: 'text',
    nullable: true,
  })
  schema?: string;
  
  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  featuredImageUrl?: string;
  
  @Column({
    type: 'timestamp', // 'datetime' in mysql
    nullable: true,
  })
  publishOn?: Date;

  @OneToOne(() => MetaOption,(metaOptions)=>metaOptions.post,{
    cascade:true,
    eager:true
  })
  metaOptions?: MetaOption;

  @ManyToOne(()=>User, (user)=>user.posts,{
    eager:true
  })
  author: User;

  @ManyToMany(()=>Tag,(tag)=>tag.posts, {
    eager:true
  })
  @JoinTable()
  tags?: Tag[];
  static title: string | undefined;
}
