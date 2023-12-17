import { ExecutionContext, ForbiddenException, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";
import { roles } from "../enums/valid-role.enum";
import { User } from "../../users/entities/user.entity";

//user decorator roles y usuario
export const CurrentUser = createParamDecorator((roles: roles[] = [], context: ExecutionContext)=> {
    const ctx = GqlExecutionContext.create(context);
    const user: User = ctx.getContext().req.user;    
    if(!user){
        throw new InternalServerErrorException(`no user inside the request`)
    }
    if(roles.length === 0 ) return user;

    for(const role of user.roles){
        if(roles.includes(role as roles))
        return user;
    }

   throw new ForbiddenException(`User ${user.fullName} need a valid roles [${roles}]`);
})