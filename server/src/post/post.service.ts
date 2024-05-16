import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {Post, Prisma} from "@prisma/client";
import {diskStorage} from "multer";
import { extname } from 'path';
import { createWriteStream } from 'fs';
import { PostDetails, PostType } from './post.model';
@Injectable()
export class PostService {
    constructor(
        private readonly prismaService: PrismaService,
    ){}

    // async saveVideo(video: )
}
