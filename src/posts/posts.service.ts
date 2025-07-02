import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPosts(userId: string) {
    try {
      const data = await this.prisma.posts.findMany({
        where: {
          userId: userId,
        },
      });
      return data;
    } catch (error) {
      console.log('error fetching posts: ', error);
      return null;
    }
  }

  async createPost(userId: string, title: string, content: string) {
    try {
      const post = await this.prisma.posts.create({
        data: {
          title: title,
          content: content,
          user: {
            connect: { id: userId },
          },
        },
      });

      return {
        message: 'Post created successfully',
        data: post,
      };
    } catch (error) {
      console.error('Error creating post:', error);
      throw new Error('Failed to create post');
    }
  }

  async deletePost(postId: string) {
    try {
      await this.prisma.posts.delete({
        where: { id: postId },
      });

      return {
        message: 'Post deleted successfully',
      };
    } catch (error) {
      console.error('Error deleting post:', error);
      throw new Error('Failed to delete post');
    }
  }
}
