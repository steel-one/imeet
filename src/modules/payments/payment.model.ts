import { Field, Float, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaymentModel {
  @Field(() => String) id: string;
  @Field(() => String) name: string;
  @Field(() => String) userId: string;
  @Field(() => String) eventId: string;
  @Field(() => Float) amount: number;
}

@ObjectType()
export class PaymentManyAndCountModel {
  @Field(() => [PaymentModel])
  list: PaymentModel[];

  @Field(() => Int)
  totalCount: number;
}
