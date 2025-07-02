import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { PostsService } from '@posts/posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}
  @Get()
  async fetchAllPosts(@Req() req: Request) {
    const userId = req.user?.id || '';
    const posts = await this.postService.getAllPosts(userId);
    if (posts) {
      return {
        statusCode: 200,
        message: 'Posts fetched successfully',
        posts: posts,
      };
    } else {
      return new InternalServerErrorException('Failed to Fetch Posts');
    }
  }

  @Post()
  async createPost(@Req() req: Request) {
    const userId = req.user?.id || '';
    const { title, content } = req.body;
    console.log(title, content);
    if (title.trim() == '' || content.trim() == '') {
      return new BadRequestException('title or content is required..');
    }
    const posts = await this.postService.createPost(userId, title, content);
    if (!posts) {
      return new InternalServerErrorException('Failed to Create a new Post.');
    } else {
      return {
        message: posts.message,
        post: posts.data,
      };
    }
  }

  @Delete('deletePost')
  deletePostById(@Query('postId') postId: string) {
    return this.postService.deletePost(postId);
  }
}
