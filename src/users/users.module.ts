import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ItemsModule } from '../items/items.module';
import { ListModule } from '../list/list.module';
import { ListService } from '../list/list.service';

@Module({
  providers: [UsersResolver, UsersService],
  imports: [TypeOrmModule.forFeature([User]), ItemsModule, ListModule], //!necesitas exportar el modulo para importarlo ejemplo el ItemsModulo
  //!para exportar mis servicios a otros modulos
  exports: [
    TypeOrmModule,
    UsersService
  ]
})
export class UsersModule {}
