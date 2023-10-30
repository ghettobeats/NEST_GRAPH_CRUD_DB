import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import {ExtractJwt, Strategy} from 'passport-jwt';
import { User } from "../../users/entities/user.entity";
import { jwtPayload } from "../interface/jwt-payload.interface";
import { AuthService } from "../auth.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    
 constructor(
    private readonly authService: AuthService,
    configService: ConfigService
    ){
    super({
        secretOrKey: configService.get('SECRET'),
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
}
 async validate(payload: jwtPayload): Promise<User>{
    const {id} = payload;
    //const user = await this.authService.validateUser(id);
   return await this.authService.validateUser(id)
}
}