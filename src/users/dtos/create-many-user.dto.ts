/* eslint-disable prettier/prettier */
import { IsArray, IsNotEmpty, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUserDto {
    // eslint-disable-next-line prettier/prettier
    @ApiProperty({
        type: 'array',
        required: true,
        items: {
            type: "User"
        }
    })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
