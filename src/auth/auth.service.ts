import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt'
import { LoginInput, SignupInput } from '../auth/dto/inputs';
import { AuthResponse } from './dto/types/authResponse';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly userServise: UsersService,
        private readonly jwtService: JwtService
    ) {}
    private async getJwtToken(userId: string){
        return this.jwtService.sign({ id: userId })
    }
    
    async signup(signupInput :SignupInput): Promise<AuthResponse>{
        //TODO: Crear el usuario en el servicio de usuarios
        const user = await this.userServise.create(signupInput);
        //TODO: Crear Token
        const token = await this.getJwtToken(user.id)
        return {token,user}
    }
    async login({email, password}: LoginInput) : Promise<AuthResponse>{
        //! const {email, password}= loginInput; tambien se pudiera hacer asi
    const user = await this.userServise.findOneByEmail(email);
    if(!bcrypt.compareSync(password, user.password)){
        throw new UnauthorizedException();
    }
        const token = await this.getJwtToken(user.id)
       return{
        token,
        user
       }

    }
    async validateUser(id: string): Promise<User>{
        const user = await this.userServise.findOneById(id);
        if(!user.isActive)
            throw new UnauthorizedException(`User is inactive, talk with an admin`)

            delete user.password;
            return user;
    }
}
