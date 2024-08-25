import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LocaleModel {
  @Field(() => String) id: string;

  @Field(() => String, { name: 'name' })
  name: string;
}

@ObjectType()
export class LocaleManyAndCountModel {
  @Field(() => [LocaleModel])
  list: LocaleModel[];

  @Field(() => Int)
  totalCount: number;
}
