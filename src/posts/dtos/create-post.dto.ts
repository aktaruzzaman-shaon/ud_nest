// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import {
//   IsArray,
//   IsEnum,
//   IsISO8601,
//   IsJSON,
//   IsNotEmpty,
//   IsOptional,
//   IsString,
//   IsUrl,
//   Matches,
//   MaxLength,
//   Min,
//   MinLength,
//   ValidateNested,
// } from 'class-validator';

import {
  IsArray,
  IsDateString,
  IsEnum,
  IsInt,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { postType } from '../enums/postType.enum';
import { postStatus } from './postStatus.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-metaOptions.dto';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

// import { CreatePostMetaOptionsDto } from './create-post-meta-options.dto';
// import { Type } from 'class-transformer';
// import { postStatus } from './postStatus.enum';

// export class CreatePostDto {
//   @ApiProperty({
//     example: 'This is a title',
//     description: 'This is the title for the blog post',
//   })
//   @IsString()
//   @MinLength(4)
//   @MaxLength(512)
//   @IsNotEmpty()
//   title: string;

//   @ApiProperty({
//     enum: postType,
//     description: "Possible values, 'post', 'page', 'story', 'series'",
//   })
//   @IsEnum(postType)
//   @IsNotEmpty()
//   postType: postType;

//   @ApiProperty({
//     description: "For Example - 'my-url'",
//     example: 'my-blog-post',
//   })
//   @IsString()
//   @IsNotEmpty()
//   @MaxLength(256)
//   @MinLength(4)
//   @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
//     message:
//       'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
//   })
//   slug: string;

//   @ApiProperty({
//     enum: postStatus,
//     description: "Possible values 'draft', 'scheduled', 'review', 'published'",
//   })
//   @IsEnum(postStatus)
//   @IsNotEmpty()
//   status: postStatus;

//   @ApiPropertyOptional({
//     description: 'This is the content of the post',
//     example: 'The post content',
//   })
//   @IsString()
//   @IsOptional()
//   content?: string;

//   @ApiPropertyOptional({
//     description:
//       'Serialize your JSON object else a validation error will be thrown',
//     example:
//       '{\r\n "@context": "https://schema.org",\r\n "@type": "Person"\r\n }',
//   })
//   @IsOptional()
//   @IsJSON()
//   schema?: string;

//   @ApiPropertyOptional({
//     description: 'Featured image for your blog post',
//     example: 'http://localhost.com/images/image1.jpg',
//   })
//   @IsOptional()
//   @MinLength(4)
//   @MaxLength(1024)
//   @IsUrl()
//   featuredImageUrl?: string;

//   @ApiPropertyOptional({
//     description: 'The date on which the blog post is published',
//     example: '2024-03-16T07:46:32+0000',
//   })
//   @IsISO8601()
//   @IsOptional()
//   publishOn?: Date;

//   @ApiPropertyOptional({
//     description: 'Array of tags passed as string values',
//     example: ['nestjs', 'typescript'],
//   })
//   @IsOptional()
//   @IsArray()
//   @IsString({ each: true })
//   @MinLength(3, { each: true })
//   tags?: string[];

//   @ApiPropertyOptional({
//     type: 'array',
//     required: false,
//     items: {
//       type: 'object',
//       properties: {
//         key: {
//           type: 'string',
//           description:
//             'The key can be any string identifier for your meta option',
//           example: 'sidebarEnabled',
//         },
//         value: {
//           type: 'any',
//           description: 'Any value that you want to save to the key',
//           example: true,
//         },
//       },
//     },
//   })
//   @IsOptional()
//   @IsArray()
//   @ValidateNested({ each: true })
//   @Type(() => CreatePostMetaOptionsDto)
//   metaOptions?: CreatePostMetaOptionsDto[];
// }
export class CreatePostDto {
  @ApiProperty({
    description: 'Title is Post dto',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    enum: postType,
    description: "Possible values ,'hello' 'post', 'page' ",
  })
  @IsEnum(postType)
  @IsNotEmpty()
  postType: postType;

  @ApiProperty({
    description: "For example - 'my url'",
    example: 'my-blogs',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all small letters and uses only "-" and without spaces. For example "my-url"',
  })
  slug: string;

  @ApiProperty({
    description: "Possible value 'draft', 'schedule'",
  })
  @IsEnum(postStatus)
  @IsNotEmpty()
  status: postStatus;

  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'This is any valid content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object else a validation error will be thrown',
  })
  @IsOptional()
  @IsJSON()
  schema?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsUrl()
  featuredImageUrl?: string;

  @ApiProperty({
    description: 'Must be a valid timestamp in ISO8601',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsOptional()
  @IsDateString()
  publishOn?: string;

  @ApiPropertyOptional({
    description: "Array of id's of tag",
    example: [1, 2],
  })
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiPropertyOptional({
    type: CreatePostMetaOptionsDto,
    required: false,
    items: {
      type: 'object',
      properties: {
        metavalue: {
          type: 'json',
          description: 'Any value that you want to save to the key',
          example: '{"siderbarEnabled":true}',
        },
      },
    },
  })
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePostMetaOptionsDto)
  metaOptions?: CreatePostMetaOptionsDto;

  @ApiProperty({
    type: 'integer',
    required: true,
    example: 1,
  })
  @IsInt()
  @IsNotEmpty()
  authorId: number;
}
