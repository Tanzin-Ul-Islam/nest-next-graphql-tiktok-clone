import { InputType, Field } from '@nestjs/graphql';

import * as GraphQLUpload from 'graphql-upload/GraphQLUpload';
import { User } from 'src/user/user.model';
@InputType()
export class CreatePostDto {
  @Field()
  text: string;

  @Field(() => GraphQLUpload, { nullable: true })
  video: string;
}
// 