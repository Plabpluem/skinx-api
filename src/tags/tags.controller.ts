import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { HelperService } from 'src/helper/helper.service';
import { UserTypeGuard } from 'src/auth/auth.guard';

@UseGuards(UserTypeGuard)
@Controller('api/tags')
export class TagsController {
  constructor(
    private readonly tagsService: TagsService,
    private readonly helperService: HelperService,
  ) {}

  @Get('/dropdown')
  async findAll() {
    const response = await this.tagsService.findAllTagDropdown();
    return this.helperService.createResponse(response);
  }
}
