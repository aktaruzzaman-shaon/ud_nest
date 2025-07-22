import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class PatchhPostDto extends PartialType(CreatePostDto) {
  @ApiProperty({
    description: 'The id of the post that needs to be udpated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
  static id: any;
  static title: any;
  static content: any;
  static status: any;
  static postType: any;
  static slug: any;
  static featuredImageUrl: any;
  static publishOn: any;
}
