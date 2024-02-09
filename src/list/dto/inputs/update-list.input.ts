import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { CreateListInput } from './create-list.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {

  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
  
  @Field()
  @IsString()
  @IsOptional()
  name?: string;

}
