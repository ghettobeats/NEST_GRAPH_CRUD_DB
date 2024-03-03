import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsOptional, IsNumber, Min, IsBoolean, IsUUID } from 'class-validator';

@InputType()
export class CreateListItemInput {
  
  @Field(() => Number, {nullable: true})
  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity: number = 0;
  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, {nullable: true})
  completed: boolean = false;


  @Field(() => ID)
  @IsUUID()
  listId: string;
  @Field(() => ID)
  @IsUUID()
  itemId: string; 
}
