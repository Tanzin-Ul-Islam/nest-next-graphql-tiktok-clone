import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService){}

    async getUsers(){
        return this.prismaService.user.findMany({
            include: {
                posts: true,
            }
        })
    }
}
