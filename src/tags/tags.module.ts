import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { SharedModule } from 'src/shared.module';

@Module({
  imports:[SharedModule],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
