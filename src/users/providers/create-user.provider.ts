import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
  ) {}

  public async createuser(createUserDto: CreateUserDto) {
    let existingUser: any;
    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
      // eslint-disable-next-line prettier/prettier
    } catch (error: any) {
      throw new RequestTimeoutException(
        'Unable to process the request. Please try again later.',
        {
          description: 'Database connection error',
        },
      );
    }

    if (existingUser) {
      throw new BadRequestException(
        'The user already exists with this email address.',
      );
    }

    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingProvider.hashPassword(createUserDto.password),
    });
    console.log(newUser)

    try {
      newUser = await this.usersRepository.save(newUser);
      console.log(newUser)
    } catch (error) {
        console.log(error)
      throw new RequestTimeoutException(
        'Unable to process the request. Please try again later.',

        {
          description: 'Database connection error',
        },
      );
    }
    return newUser;
  }
}
