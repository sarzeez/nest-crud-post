import { Module } from '@nestjs/common';
import { PostController } from '../controller/post.controller';
import { PostService } from '../service/post.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostEntity } from '../entity/post.dto';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity])],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}
