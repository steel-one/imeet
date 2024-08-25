import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class Sorting {
  @Field({ nullable: true })
  sort?: string;
  @Field({ nullable: true })
  order?: 'ASC' | 'DESC';
  @Field({ nullable: true })
  nulls?: 'NULLS FIRST' | 'NULLS LAST';
}

@InputType()
export class Paging {
  @Field({ nullable: true })
  page?: number;

  @Field({ nullable: true })
  perPage?: number;
}

@InputType()
export class GetManyArgs {
  @Field({ nullable: true })
  ids?: string;

  @Field({ nullable: true })
  search?: string;

  @Field({ nullable: true })
  paginate?: Paging;

  @Field({ nullable: true })
  orderBy: Sorting;
}
