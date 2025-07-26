import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UserService } from 'src/users/providers/users.service';
import { SignInProvider } from './sign-in.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,

    private readonly singInProvider: SignInProvider,
  ) {}
  public async signIn(signInDto: SignInDto) {
    return await this.singInProvider.signIn(signInDto);
  }
}
