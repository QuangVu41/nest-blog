import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Repository } from 'typeorm';
import { TagsService } from 'src/tags/providers/tags.service';
import { UsersService } from 'src/users/providers/users.service';
import { Post } from '../post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    const author = await this.usersService.findOneById(user.sub);
    try {
      const tags = await this.tagsService.findMultipleTags(createPostDto.tags!);

      if (createPostDto.tags?.length !== tags.length)
        throw new BadRequestException('Please provide valid tag ids');

      const post = this.postsRepository.create({
        ...createPostDto,
        author,
        tags,
      });

      return await this.postsRepository.save(post);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new ConflictException(error.message, {
        description: 'Ensure post slug is unique and not a duplicate',
      });
    }
  }
}
