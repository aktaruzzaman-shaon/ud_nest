import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UserService } from './providers/users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [UsersController],
  providers: [UserService],
  imports: [TypeOrmModule.forFeature([User])],
})
export class UsersModule {
  // This module is currently empty, but you can add providers, controllers, and imports as needed.
  // For example, you might want to import TypeOrmModule for user entities or other modules.
}
