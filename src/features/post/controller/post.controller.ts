import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { PostService } from '../service/post.service';
import { date } from '@/utils/date';
import { PostDto } from '../dto/post.dto';
import { orderItemByDate } from '@/utils/helper';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @Get()
  getPosts() {
    return this.postService.getPosts();
  }

  @Get(':id')
  async getPost(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.getPost(id);
    if (!post) {
      throw new NotFoundException();
    }
    const { createdAt, updatedAt, ...result } = post;
    return {
      ...result,
      createdAt: date(createdAt),
      updatedAt: updatedAt ? date(updatedAt) : null,
    };
  }

  @Post()
  async createPost(@Body() createPostDetails: PostDto) {
    const post = await this.postService.createPost(createPostDetails);
    return orderItemByDate(post);
  }

  @Put(':id')
  async updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDetails: PostDto,
  ) {
    const post = await this.postService.getPost(id);
    if (!post) {
      throw new NotFoundException();
    }
    await this.postService.updatePost(id, updatePostDetails);
  }

  @Delete(':id')
  async deletePost(@Param('id', ParseIntPipe) id: number) {
    const post = await this.postService.getPost(id);
    if (!post) {
      throw new NotFoundException();
    }
    await this.postService.deleteUser(id);
  }
}
