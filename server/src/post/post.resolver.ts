import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { PostService } from './post.service';
import { PostType } from './post.model';
import { Request } from 'express';
import { GraphQLUpload } from 'graphql-upload-ts';
import { UseGuards } from '@nestjs/common';
import { GraphqlAuthGuard } from 'src/guards/graphql-auth.guard';

@Resolver()
export class PostResolver {
    constructor(
        private readonly postService: PostService
    ) { }
    @UseGuards(GraphqlAuthGuard)
    @Mutation((returns) => PostType)
    async createPost(
        @Context() Context: { req: Request },
        @Args({ name: 'video', type: () => GraphQLUpload }) video: any,
        @Args('text') text: string,
    ) {

    }
}
