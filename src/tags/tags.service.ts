import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TagsService {
  constructor(private readonly prismaService:PrismaService){}

  async findAllTagDropdown(){
    const result = await this.prismaService.tags.findMany()
    const mapData = result.map((item:any) =>({value:item.name,label: item.name}))
    return mapData
  }
}
