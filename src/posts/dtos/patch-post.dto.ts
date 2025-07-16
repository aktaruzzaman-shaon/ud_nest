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
}
