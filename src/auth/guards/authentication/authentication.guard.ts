/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-unused-labels */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AccessTokenGuard } from '../access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  private static readonly defaultAuthType = AuthType.Bearer;
  private readonly authTypeGuardMap: Record<
    AuthType,
    CanActivate | CanActivate[]
  >;
  constructor(
    private readonly reflector: Reflector,
    private readonly accessTokenGuard: AccessTokenGuard,
  ) {
    this.authTypeGuardMap = {
      [AuthType.Bearer]: this.accessTokenGuard,
      [AuthType.None]: { canActivate: () => true },
    };
  }

  // private readonly authTypeGuardMap: Record<
  //   AuthType,
  //   CanActivate | CanActivate[]
  // > = {
  //   [AuthType.Bearer]: this.accessTokenGuard,
  //   [AuthType.None]: { canActivate: () => true },
  // };

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const authTypes = this.reflector.getAllAndOverride(AUTH_TYPE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) ?? [AuthenticationGuard.defaultAuthType];
    const guards = authTypes
      .map((type: AuthType) => this.authTypeGuardMap[type])
      .flat();
    const error = new UnauthorizedException();

    // Loop through guards and call canActivate
    for (const instance of guards) {
      // Use 'canActivate' (lowercase 'c') as per NestJS interface
      
      const canActivateResult = await Promise.resolve(
        typeof instance.canActivate === 'function'
          ? instance.canActivate(context)
          : true,
      );
      
      if (!canActivateResult) {
        throw error;
      }
      // console.log(instance)
      // const canActivate = await Promise.resolve(
      //   instance.canActivate(context).catch((err: any) => {
      //     error: err;
      //   }),
      // );
      // console.log(canActivate)
      // if(canActivate){
      //   return true;
      // }
    }
    return true;
  }
}
