import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { HelperService } from 'src/helper/helper.service';
import { UserTypeGuard } from 'src/auth/auth.guard';

@Controller('api/posts')
@UseGuards(UserTypeGuard)

export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly helperService: HelperService,
  ) {}

  @Get()
  async findAll(@Query() dto: any,@Request() req:any) {
    const response = await this.postsService.findAll(dto);
    return this.helperService.createResponse(response);
  }

  @Get(':id')
  async findOne(@Param('id') uuid: string) {
    const response = await this.postsService.findOne(uuid);
    return this.helperService.createResponse(response);
  }
}
