import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../post.entity';
import { Repository } from 'typeorm';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostProvider } from './create-post.provider';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,
    private readonly createPostProvider: CreatePostProvider,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}

  public async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.create(createPostDto, user);
  }

  public async findAll(
    getPostsDto: GetPostsDto,
    userId: string,
  ): Promise<Paginated<Post>> {
    return await this.paginationProvider.paginateQuery(
      {
        limit: getPostsDto.limit,
        page: getPostsDto.page,
      },
      this.postsRepository,
    );
  }

  public async update(patchPostDto: PatchPostDto) {
    try {
      const tags = await this.tagsService.findMultipleTags(patchPostDto.tags!);
      if (!tags || tags.length !== patchPostDto.tags?.length)
        throw new BadRequestException(
          'Please check your tag Ids and make sure they are exist',
        );

      const post = await this.postsRepository.findOneBy({
        id: patchPostDto.id,
      });
      if (!post) throw new BadRequestException('The post does not exist');

      post.title = patchPostDto.title ?? post.title;
      post.content = patchPostDto.content ?? post.content;
      post.status = patchPostDto.status ?? post.status;
      post.postType = patchPostDto.postType ?? post.postType;
      post.slug = patchPostDto.slug ?? post.slug;
      post.featuredImageUrl =
        patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
      post.publishOn = patchPostDto.publishOn ?? post.publishOn;
      post.tags = tags;
      return await this.postsRepository.save(post);
    } catch (err) {
      if (err instanceof BadRequestException) throw err;

      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try later',
      );
    }
  }

  public async delete(id: number) {
    await this.postsRepository.delete(id);

    return { deleted: true, id };
  }
}
