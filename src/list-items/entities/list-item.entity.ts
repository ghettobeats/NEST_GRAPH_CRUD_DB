import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Item } from 'src/items/entities/item.entity';
import { List } from 'src/list/entities/list.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ListItems')
@ObjectType()
export class ListItem {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;
  @Column({type: 'numeric'})
  @Field(()=> Number)
  quantity: number;
  //?se puede poner fecha si tiene fecha es porque esta en el buy car
  @Column('boolean')
  @Field(()=> Boolean)
  completed: boolean; 

  @ManyToOne(() => List, (list) => list.listItem, {lazy: true})
  @Field(() => List)
  list: List;

  @ManyToOne(() => Item, (item) => item.listItem, {lazy: true})
  @Field(() => Item)
  item: Item
}
