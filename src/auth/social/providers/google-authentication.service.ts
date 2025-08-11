import { forwardRef, Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dtos/google-token.dto';
import { UserService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;

  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly generateTokenProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleLCientSecret;
    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authentication(googleTokenDto: GoogleTokenDto) {
    //verify google token by user
    const loginTicket = await this.oauthClient.verifyIdToken({
      idToken: googleTokenDto.token,
    });
    console.log(loginTicket)
    //extract the payload form google jwt
    const payload = loginTicket.getPayload();
    if (!payload) {
      throw new Error('Invalid Google token payload');
    }
    const { email, sub: googleId } = payload;
    //find the user in the database using the google id
    const user = await this.userService.findOneByGoogleId(googleId);
    //if the googleId exists generate token
    if (user) {
      return this.generateTokenProvider.generateTokens(user);
    }
    //if not fcreate a new user and then generate tokens
  }
}
