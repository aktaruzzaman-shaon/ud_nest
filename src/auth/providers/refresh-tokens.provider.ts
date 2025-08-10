import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefresTokenDto } from '../dtos/refres-token.dto';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import { GenerateTokensProvider } from './generate-tokens.provider';
import { UserService } from 'src/users/providers/users.service';
import { ActiveUserData } from '../interfaces/active-userData.interface';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguation: ConfigType<typeof jwtConfig>,
    private readonly GenerateTokensProvider: GenerateTokensProvider,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}
  public async refreshTokens(refreshTokenDto: RefresTokenDto) {
    try {
      //verify the refresh token using JwtService
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfiguation.secret,
        audience: this.jwtConfiguation.audience,
        issuer: this.jwtConfiguation.issuer,
      });
      //Fetch the user from the database useing the userId from token
      const user = await this.userService.findOneById(sub);
      if (!user) {
        throw new Error('User not found');
      }
      //Generate the tokens
      return await this.GenerateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
