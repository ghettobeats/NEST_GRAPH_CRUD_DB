import { InputType, Int, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {
  // @Field(() => Int, { description: 'Example field (placeholder)' })
  // exampleField: number;
  
  @Field(()=>String)
  @IsEmail()
  email: string;

  @Field(()=>String)
  @IsNotEmpty()
  fullName: string;

  @Field(()=>String)
  @MinLength(6)
  password:string;


}
