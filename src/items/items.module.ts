import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';

@Module({
  providers: [ItemsResolver, ItemsService],
  imports: [TypeOrmModule.forFeature([Item])],
  exports: [ItemsService, TypeOrmModule] //!Si exporto un servicio necesito importarlo en el modulo que lo va a usar ejemplo users.module
})
export class ItemsModule {}
