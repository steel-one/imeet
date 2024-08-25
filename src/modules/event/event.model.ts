import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BaseModel } from '../../utils/shared.models';

@ObjectType()
export class EventModel extends BaseModel {
  @Field(() => String) id: string;
  @Field(() => String) name: string;
  @Field(() => Date) start: Date;
  @Field(() => Date) end: Date;
}

@ObjectType()
export class EventManyAndCountModel {
  @Field(() => [EventModel])
  list: EventModel[];

  @Field(() => Int)
  totalCount: number;
}
