import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TagsModule } from './tags/tags.module';

@Module({
  imports: [PostsModule, UsersModule, AuthModule, TagsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
