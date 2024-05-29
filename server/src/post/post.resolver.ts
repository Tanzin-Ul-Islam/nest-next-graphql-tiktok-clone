import { Args, Context, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostDetails, PostType } from './post.model';
import { Request } from 'express';
import { GraphQLUpload } from 'graphql-upload-ts';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/guards/graphql-auth.guard';
import { Prisma } from '@prisma/client';

@Resolver()
export class PostResolver {
    constructor(
        private readonly postService: PostService
    ) { }
    @UseGuards(GraphqlAuthGuard)
    @Mutation((returns) => PostType)
    async createPost(
        @Context() context: { req: Request },
        @Args({ name: 'video', type: () => GraphQLUpload }) video: any,
        @Args('text') text: string,
    ) {
        const userId = context.req.user.sub;
        const videoPath = await this.postService.saveVideo(video);
        const postData = {
            text,
            video: videoPath,
            user: { connect: { id: userId } }
        }
        return await this.postService.createPost(postData);

    }

    @Query((returns) => PostDetails)
    async getPostById(@Args('id') id: number){
        return await this.postService.getPostById(id);
    }

    @Query((returns)=>[PostType])
    async getPosts(
        @Args('skip', {type: ()=> Int, defaultValue: 0}) skip: number,
        @Args('take', {type: ()=> Int, defaultValue: 1}) take: number,
    ): Promise<PostType[]>{
        console.log("skip");
        return await this.postService.getPosts(skip, take);
    }
}
