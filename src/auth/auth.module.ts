import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [AuthResolver, AuthService],
  //!al importar el userModule me traje todo lo que exporte. 
  //?en este ejemplo solo exporte UsersServices
  imports: [
    UsersModule
  ]
})
export class AuthModule {}
