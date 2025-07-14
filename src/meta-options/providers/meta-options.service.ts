import { Body, Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-metaOptions.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-option.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostMetaOptionDto: CreatePostMetaOptionsDto) {
    // eslint-disable-next-line prefer-const
    let metaOption = this.metaOptionsRepository.create(createPostMetaOptionDto);
    return await this.metaOptionsRepository.save(metaOption);
  }
}
