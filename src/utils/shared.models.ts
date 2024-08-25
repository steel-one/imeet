import {
  Field,
  GraphQLISODateTime,
  InputType,
  Int,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';

export enum OrderBy {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(OrderBy, {
  name: 'OrderBy',
});

@ObjectType()
@InputType()
export class SoftDelete {
  @Field(() => GraphQLISODateTime, { nullable: true, name: 'deleted_utc' })
  deletedUtc?: Date;
  @Field(() => String, { nullable: true, name: 'deleted_by' })
  deletedBy?: string;
}

@ObjectType()
export class BaseModel {
  @Field(() => GraphQLISODateTime, { nullable: true, name: 'created_utc' })
  createdUtc?: Date;
  @Field(() => String, { nullable: true, name: 'created_by' })
  createdBy?: string;
  @Field(() => GraphQLISODateTime, { nullable: true, name: 'updated_utc' })
  updatedUtc?: Date;
  @Field(() => String, { nullable: true, name: 'updated_by' })
  updatedBy?: string;
  @Field(() => GraphQLISODateTime, { nullable: true, name: 'deleted_utc' })
  deletedUtc?: Date;
  @Field(() => String, { nullable: true, name: 'deleted_by' })
  deletedBy?: string;
}

@ObjectType()
@InputType()
export class Paginator {
  @Field(() => Int)
  per_page: number;

  @Field(() => Int)
  page: number;
}
