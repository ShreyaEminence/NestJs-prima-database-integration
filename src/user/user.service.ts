import { Injectable, UnauthorizedException } from '@nestjs/common';
import { updateData } from '@src/interfaces/users';
import { PrismaService } from '@src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async userById(userId: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return null;
      } else {
        return { id: user.id, name: user.name, email: user.email };
      }
    } catch (error) {
      console.log('errror::', error);
      return null;
    }
  }

  async updateUserDetails(userId: string, updatedData: updateData) {
    try {
      const updateuser = await this.prisma.user.update({
        where: { id: userId },
        data: { name: updatedData.name },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return updateuser;
    } catch (error) {
      return null;
    }
  }
}
