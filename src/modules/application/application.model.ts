import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ApplicationModel {
  @Field(() => String) id: string;
  @Field(() => String) name: string;
  @Field(() => String) link: string;
}

@ObjectType()
export class ApplicationManyAndCountModel {
  @Field(() => [ApplicationModel])
  list: ApplicationModel[];

  @Field(() => Int)
  totalCount: number;
}
