import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  SetMetadata,
} from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';
import { Auth } from './decorator/auth.decorator';
import { AuthType } from './enums/auth-type.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  @Auth(AuthType.None)
  @SetMetadata('authType','none')
  public async signIn(@Body() singInDto: SignInDto) {
    console.log("singindto");
    return this.authService.signIn(singInDto);
  }
}
