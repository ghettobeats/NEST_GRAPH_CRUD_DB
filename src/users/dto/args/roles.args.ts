import { IsArray } from "class-validator";
import { ArgsType, Field } from "@nestjs/graphql";
import { roles } from "../../../auth/enums/valid-role.enum";

 @ArgsType()
export class rolesArgs{

    @Field(()=> [roles], {nullable: true})
    @IsArray()
    roles: roles[] = []
}