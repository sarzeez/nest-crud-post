import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from '../entity/post.dto';
import { Repository } from 'typeorm';
import { PostDto } from '../dto/post.dto';
import { unixTime } from '@/utils/date';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postRepository: Repository<PostEntity>,
  ) {}

  getPosts(): Promise<Array<PostEntity>> {
    return this.postRepository.find();
  }

  getPost(id: number): Promise<PostEntity> {
    return this.postRepository.findOneBy({ id });
  }

  createPost(postDto: PostDto): Promise<PostEntity> {
    const post = this.postRepository.create({
      ...postDto,
      createdAt: unixTime,
    });
    return this.postRepository.save(post);
  }

  updatePost(id: number, updatedPost: PostDto): Promise<any> {
    return this.postRepository.update(
      { id },
      { ...updatedPost, updatedAt: unixTime },
    );
  }

  deleteUser(id: number): Promise<any> {
    return this.postRepository.delete({ id });
  }
}
