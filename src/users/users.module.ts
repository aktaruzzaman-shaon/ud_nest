import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersCreateManyProvider } from './providers/users-create-many.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import profileConfig from './config/profile.config';
import { AuthModule } from 'src/auth/auth.module';
import { FindOneByEmailProvider } from './providers/find-one-by-email.provider';
import { FindOneByGoogleIdProviderTs } from './providers/find-one-by-google-id.provider.ts';

@Module({
  controllers: [UsersController],
  providers: [
    UserService,
    UsersCreateManyProvider,
    CreateUserProvider,
    FindOneByEmailProvider,
    FindOneByGoogleIdProviderTs,
    // {
    //   provide: APP_GUARD,
    //   useClass: AccessTokenGuard,
    // },
  ],
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(profileConfig),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UsersModule {
  // This module is currently empty, but you can add providers, controllers, and imports as needed.
  // For example, you might want to import TypeOrmModule for user entities or other modules.
}
