import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'Get User with a specific ID',
    example: 154464,
  })
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  id?: number | undefined;
}
