import { HttpException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PrismaService } from 'src/prisma.service';
import { createPaginator } from 'prisma-pagination';
import { Posts, Prisma } from '@prisma/client';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(req: any) {
    try {
      const paginate = createPaginator({ perPage: req.perPage ?? 10 });
      const tags = Array.isArray(req.query) ? req.query : [req.query];

      const result = await paginate<Posts, Prisma.PostsFindManyArgs>(
        this.prismaService.posts,
        {
          ...(req.query && {
            where: {
              AND: tags.map((tag) => ({
                tags: {
                  some: {
                    name: tag,
                  },
                },
              })),
            },
          }),
          include: {
            tags: {
              select: {
                name: true,
              },
            },
          },
        },
        {
          page: req.page ?? 1,
        },
      );
      return {
        list: result.data,
        page: result.meta,
      };
    } catch (error) {
      throw new HttpException({ message: error.message, code: 400 }, 400);
    }
  }

  async findOne(uuid: string) {
    try {
      const result = await this.prismaService.posts.findFirst({
        where: {
          uuid: uuid,
        },
        include: {
          tags: true,
        },
      });
      return result;
    } catch (error) {
      throw new HttpException({ message: error.message, code: 400 }, 400);
    }
  }
}
