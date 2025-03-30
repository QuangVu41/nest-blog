import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { Injectable, Inject } from '@nestjs/common';
import { PaginationQueryDto } from '../dtos/pagination-query.dto';
import { ObjectLiteral, Repository } from 'typeorm';
import { Paginated } from '../interfaces/paginated.interface';

@Injectable()
export class PaginationProvider {
  constructor(@Inject(REQUEST) private readonly req: Request) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
  ): Promise<Paginated<T>> {
    const records = await repository.find({
      skip: (paginationQuery.page! - 1) * paginationQuery.limit!,
      take: paginationQuery.limit,
    });

    const baseUrl = `${this.req.protocol}://${this.req.host}/`;
    const newUrl = new URL(this.req.url, baseUrl);

    const totalItems = await repository.count();
    const totalPages = Math.ceil(totalItems / paginationQuery.limit!);
    const nextPage =
      paginationQuery.page === totalPages
        ? paginationQuery.page
        : paginationQuery.page! + 1;
    const previousPage =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page! - 1;

    const finalRes: Paginated<T> = {
      data: records,
      meta: {
        itemsPerPage: paginationQuery.limit!,
        totalItems,
        currentPage: paginationQuery.page!,
        totalPages,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=1`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${paginationQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${nextPage}`,
        previous: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit}&page=${previousPage}`,
      },
    };

    return finalRes;
  }
}
