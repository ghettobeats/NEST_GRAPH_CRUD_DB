import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './items/entities/item.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { ListModule } from './list/list.module';
import { List } from './list/entities/list.entity';
import { ListItemsModule } from './list-items/list-items.module';
import { ListItem } from './list-items/entities/list-item.entity';


@Module({  
  imports: [
    ConfigModule.forRoot(),
    //TODO: Configuracion asyncrona... 
    GraphQLModule.forRootAsync({driver : ApolloDriver,
      imports:[AuthModule/*Importar modulod*/],
      inject:[JwtService/*Injectar Servicios*/],
      useFactory: async (jwtServices: JwtService) => ({
        playground: false,    
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        plugins: [ApolloServerPluginLandingPageLocalDefault()],
        context({req}){
          //la authorizacion se tercializa para evitar comentar estas lineas y pasar el token
          // const token = req.headers.authorization?.replace('Bearer ', '');   
          // if(!token) throw Error('Token needed');      

          // const payload = jwtServices.decode(token);    
          // if(!payload) throw Error('Token not valid');          
        }
      })
      }),
    //TODO: Basic Configuration de graph... 
    // GraphQLModule.forRoot<ApolloDriverConfig>({ //Apollo config
    //   driver: ApolloDriver, 
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //   autoSchemaFile: join(process.cwd(), 'src/schema.gql')
    // }),
    TypeOrmModule.forRoot({ //DATABASE Configuration
      type: 'postgres',
      host: 'localhost',
      port: + process.env.DB_PORT, //+ para convertir a int
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Item,User,List,ListItem],
      synchronize: true,
    }),
    ItemsModule,
    UsersModule,
    AuthModule,
    SeedModule,
    CommonModule,
    ListModule,
    ListItemsModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
