import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput, LoginInput } from './dto/inputs';
import { AuthResponse } from './dto/types/authResponse';
import { UseGuards } from '@nestjs/common';
import { jwtAuthguard } from './guards/jwt.auth.guard';
import { CurrentUser } from './decorator/current-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { roles } from './enums/valid-role.enum';


@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
    ) {}

    @Mutation(() => AuthResponse, {name: 'signup' })
    async signup(@Args('signup') signup: SignupInput) : Promise<AuthResponse>{
      return await this.authService.signup(signup);
    }

    @Mutation(()=>AuthResponse, {name: 'login' })
    async login(@Args('loginInput') loginInput: LoginInput) : Promise<AuthResponse>{
      return await this.authService.login(loginInput);
    } 
    @Query(()=> AuthResponse, {name: 'revalidate' })
    @UseGuards(jwtAuthguard)
     async revalidateToken(@CurrentUser(/*[roles.admin]*/) user: User) : Promise<AuthResponse>{
       return await this.authService.revalidateToken(user);
    }
}
