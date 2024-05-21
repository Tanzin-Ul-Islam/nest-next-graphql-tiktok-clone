import { ObjectType, Field } from '@nestjs/graphql';
import { LikeType } from 'src/like/like.model';
import { User } from 'src/user/user.model';

@ObjectType()
export class PostType {
    @Field()
    id: number;

    @Field()
    text?: string;

    @Field()
    createAt?: Date;

    @Field()
    video: string;

    @Field(() => User)
    user: User;

    @Field(() => [LikeType], { nullable: true })
    likes?: LikeType[];
}

@ObjectType()
export class PostDetails extends PostType {
    @Field(() => [Number], { nullable: true })
    otherPostIds?: number[];
}
