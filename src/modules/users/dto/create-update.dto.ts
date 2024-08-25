import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUpdateUserDto {
  @Field(() => String) id: string;
  @Field(() => String) name: string;
}
