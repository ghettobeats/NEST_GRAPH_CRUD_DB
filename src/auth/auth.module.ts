import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthResolver, AuthService, JwtStrategy],
  exports:[JwtStrategy, PassportModule, JwtModule],
  //!al importar el userModule me traje todo lo que exporte. 
  //?en este ejemplo solo exporte UsersServices
  imports: [
    //?Configurando el passport y jwt en el modulo de auth
    ConfigModule,
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configServices: ConfigService)=>({
          secret: configServices.get('SECRET'),
          signOptions:{
            expiresIn: '6h'
          }}),
            }),
    UsersModule
  ]
})
export class AuthModule {}
