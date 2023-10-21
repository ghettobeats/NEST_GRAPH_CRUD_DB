import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponse } from './dto/types/authResponse';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService
    ) {}

    @Mutation(() => AuthResponse, {name: 'signup' })
    async signup(@Args('signup') signup: SignupInput ) : Promise<AuthResponse>{
      return await this.authService.signup(signup);
    }

    // @Mutation(/**??*/, {name: 'login' })
    // async login() : Promise</**??*/>{
    //   return await this.authService.login();
    // } 
    // @Query(/**??*/, {name: 'revalidate' })
    // async revalidateToken() : Promise</**??*/>{
    //   return await this.authService.RevalidateToken();
    // }
}
