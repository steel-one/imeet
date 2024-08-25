import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../utils/shared.models';

@ObjectType()
export class NotificationModel extends BaseModel {
  @Field(() => String) id: string;
  @Field(() => String) title: string;
  @Field(() => String) body: string;
  @Field(() => String) from: string;
  @Field(() => String) to: string;
}

@ObjectType()
export class NotificationManyAndCountModel {
  @Field(() => [NotificationModel])
  list: NotificationModel[];

  @Field(() => Int)
  totalCount: number;
}
