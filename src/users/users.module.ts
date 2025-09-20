import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SharedModule } from 'src/shared.module';

@Module({
  imports:[SharedModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
