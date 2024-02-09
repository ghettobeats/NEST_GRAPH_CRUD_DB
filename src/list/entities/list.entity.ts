import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: 'Lista'})
@ObjectType()
export class List {  
  
  @PrimaryGeneratedColumn('uuid')
  @Field(()=> ID)
  id:string;

  @Column({nullable: true})
  @Field(()=> String, {nullable: false})
  name: string;
  //tipo de relacion, index('userid-list-index')

  @ManyToOne(()=> User, (user) => user.lists, {nullable: false, lazy: true})
  @Index('userId-list-index')
  @Field(()=> User)
  user: User;

}
