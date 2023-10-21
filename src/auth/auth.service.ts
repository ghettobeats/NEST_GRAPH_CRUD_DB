import { Injectable } from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './dto/types/authResponse';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private readonly userServise: UsersService
    ) {
        
    }
    async signup(signupInput :SignupInput): Promise<AuthResponse>{
        //TODO: Crear el usuario en el servicio de usuarios
        const user = await this.userServise.create(signupInput);
        //TODO: Crear Token
        const token = '123'
        return {token,user}
    }
}
