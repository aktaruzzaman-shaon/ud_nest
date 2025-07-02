import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';

@Module({
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {
  // This module is currently empty, but you can add providers, controllers, and imports as needed.
  // For example, you might want to import TypeOrmModule for user entities or other modules.
}
