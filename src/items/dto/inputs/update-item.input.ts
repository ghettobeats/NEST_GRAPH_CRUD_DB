import { IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID } from 'class-validator';
import { CreateItemInput } from './create-item.input';
import { InputType, Field, Int, PartialType, Float, ID } from '@nestjs/graphql';

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field(() => ID)
  @IsNotEmpty()
  @IsUUID()
  id: string;
  
  @Field()
  @IsString()
  @IsOptional()
  name?: string;
  
  // @Field(()=> Float, {nullable : true})
  // @IsPositive()
  // quantity?: number

  @Field(()=> String, {nullable: true})
  @IsString()
  @IsOptional()
  quantityUnits?: string
}
