import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../utils/shared.models';

@ObjectType()
export class UserModel extends BaseModel {
  @Field(() => String) id: string;
  @Field(() => String) name: string;
}

@ObjectType()
export class UserManyAndCountModel {
  @Field(() => [UserModel])
  list: UserModel[];

  @Field(() => Int)
  totalCount: number;
}
