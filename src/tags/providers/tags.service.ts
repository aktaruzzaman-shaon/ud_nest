/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-const */
import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { Tag } from '../tag.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    console.log(createTagDto);
    let tag = this.tagRepository.create(createTagDto);
    console.log(tag);
    return await this.tagRepository.save(tag);
  }

  public async findMultipleTags(tags: number[] | undefined) {
    let results = await this.tagRepository.find({
      where: {
        id: In(tags ?? []),
      },
    });
    return results;
  }

  public async delete(id: number) {
    await this.tagRepository.delete(id);
    return { deleted: true, id };
  }

  public async softDelete(id: number) {
    await this.tagRepository.softRemove({ id });
    return { deleted: true, id };
  }
}
