import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './tag.entity';

@Module({
  controllers: [TagsController],
  imports: [TypeOrmModule.forFeature([Tag])], // Assuming no entities are defined for tags
})
export class TagsModule {}
