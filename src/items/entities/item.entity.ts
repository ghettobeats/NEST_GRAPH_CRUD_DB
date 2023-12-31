import { ObjectType, Field, Int, ID, Float } from '@nestjs/graphql';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:"items"})
@ObjectType()
export class Item {
    
  @PrimaryGeneratedColumn('uuid')
  @Field(()=> ID)
  id: string


  @Column()
  @Field(()=> String)
  name : string

  //  @Column()
  //  @Field(()=> Float)
  // quantity: number

   @Column({nullable:true})
   @Field(()=> String, {nullable:true})
   quantityUnits?: string


  @ManyToOne(()=> User, (user) => user.items, {nullable: false})
  @Index()//Añadir un indice en esta columna 
  @Field(()=> User)
  user: User



}
