import { Module } from '@nestjs/common';
import { ListService } from './list.service';
import { ListResolver } from './list.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { List } from './entities/list.entity';
import { ListItemsModule } from 'src/list-items/list-items.module';

@Module({
  providers: [ListResolver, ListService],
  imports: [TypeOrmModule.forFeature([List]), ListItemsModule],
  exports: [ListService, TypeOrmModule]
})
export class ListModule {}
