import { IsArray, IsBoolean, IsOptional, IsUUID} from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';
import { roles } from '../../../auth/enums/valid-role.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  
  @Field(() => ID)
  @IsUUID()
  id: string;

  @Field(()=> [roles], {nullable: true}) 
  @IsArray()
  @IsOptional()
  role? : roles[];
  
  @Field(()=> Boolean, {nullable: true})
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
  


}
