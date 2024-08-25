import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUpdateApplicationDto {
  @Field(() => String) id: string;
  @Field(() => String) name: string;
  @Field(() => String) link: string;
}
