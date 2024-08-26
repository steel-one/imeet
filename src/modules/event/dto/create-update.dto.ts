import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';

@InputType()
export class CreateUpdateEventDto {
  @Field(() => String) id: string;
  @Field(() => String) name: string;
  @Field(() => String) description: string;

  @Type(() => Date)
  start: Date;
  @Type(() => Date)
  end: Date;
}
