import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LikeType {
    @Field()
    id: number;

    @Field()
    userId?: number;

    @Field()
    postId?: number;

}
