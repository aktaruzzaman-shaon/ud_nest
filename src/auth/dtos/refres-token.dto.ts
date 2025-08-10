import { IsNotEmpty, IsString } from 'class-validator';

export class RefresTokenDto {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
