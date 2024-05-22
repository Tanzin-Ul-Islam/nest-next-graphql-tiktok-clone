import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Post, Prisma } from "@prisma/client";
import { diskStorage } from "multer";
import { extname } from 'path';
import { PostDetails, PostType } from './post.model';
import { createWriteStream } from 'fs';
import { CreatePostDto } from './dto/create-post.dto';
@Injectable()
export class PostService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async saveVideo(video: {
        createReadStream: () => any;
        filename: string;
        mimeType: string;
    }): Promise<string> {
        if (!video || !['video/mp4'].includes(video.mimeType)) {
            throw new BadRequestException(
                'Invalid video file format. Only mp4 is allowed.',

            );

        }
        const videoName = `${Date.now()}${extname(video.filename)}`;
        const videoPath = `/files/${videoName}`;
        const stream = video.createReadStream();
        const outputPath = `public${videoPath}`;
        const writeStream = createWriteStream(outputPath);
        stream.pipe(writeStream);

        await new Promise((resolve, reject) => {
            stream.on('end', resolve);
            stream.on('error', reject);
        })

        return videoPath;
    }

    async createPost(data: Prisma.PostCreateInput): Promise<Post> {
        try {
            const post = await this.prismaService.post.create({
                data: data,
            });
            return post;
        } catch (error) {
            return;
        }
    }

    async getPostById(id: number): Promise<PostDetails> {
        try {
            const post = await this.prismaService.post.findUnique({
                where: { id },
                include: { user: true, likes: true, comments: true },
            });
            if (!post) {
                throw new NotFoundException("Post not found!")
            }
            const postIds = await this.prismaService.post.findMany({
                where: { userId: post.userId },
                select: { id: true },
            });
            return { ...post, otherPostIds: postIds.map((post) => (post.id)) }
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    async getPosts(skip: number, take: number): Promise<PostType[]> {
        return await this.prismaService.post.findMany({
            skip,
            take,
            include: { user: true, likes: true, comments: true },
            orderBy: { createdAt: 'desc' }
        })
    }

    async getPostsByUserId(userId: number): Promise<PostType[]> {
        return await this.prismaService.post.findMany({
            where: { userId },
            include: { user: true }
        })
    }

    async deletePost(id: number): Promise<void> {
        const post = await this.getPostById(id);
        try {
            const fs = await import('fs');
            fs.unlinkSync(`public${post.video}`);

        } catch (error) {
            throw new NotFoundException(error.message);
        }
        await this.prismaService.post.delete({ where: { id } });
    }
}
