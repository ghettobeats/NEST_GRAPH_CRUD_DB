import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common";
import { GqlExecutionContext } from "@nestjs/graphql";


export const CurrentUser = createParamDecorator((roles = [], context: ExecutionContext)=> {
    const ctx = GqlExecutionContext.create(context);
    const user = ctx.getContext().req.user;    
    if(!user){
        throw new InternalServerErrorException(`no user inside the request`)
    }
    return user;
})