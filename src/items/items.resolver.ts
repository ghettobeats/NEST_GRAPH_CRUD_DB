import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { ItemsService } from './items.service';
import { Item } from './entities/item.entity';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { jwtAuthguard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from '../common/dto/args/pagination.args';

@Resolver(() => Item)
@UseGuards(jwtAuthguard) //autenticacion de usuario
export class ItemsResolver {
  constructor(private readonly itemsService: ItemsService) {}

  @Mutation(() => Item)
  async createItem(
    @Args('createItemInput') createItemInput: CreateItemInput,
    @CurrentUser() user:User,//Saber que usuario esta mandando la peticion    
    ) : Promise<Item>{      
    return this.itemsService.create(createItemInput, user);
  }

  @Query(() => [Item], { name: 'items' })
  async findAll(
    @CurrentUser() user: User, 
    @Args() paginationArgs: PaginationArgs
  ):Promise<Item[]>{  
    return this.itemsService.findAll(user,paginationArgs);
  }

  @Query(() => Item, { name: 'item' })
  async findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string, @CurrentUser() user: User): Promise<Item> {
    return this.itemsService.findOne(id, user);
  }

  @Mutation(() => Item)
 async updateItem(
  @Args('updateItemInput') updateItemInput: UpdateItemInput,  @CurrentUser() user: User) : Promise<Item>{
    return this.itemsService.update(updateItemInput.id, updateItemInput, user);
  }

  @Mutation(() => Item)
 async removeItem(@Args('id', { type: () => ID }) id: string, @CurrentUser() user: User) : Promise<Item>{
    //no eliminar si no estableser como status disable always

    return this.itemsService.remove(id, user);
  }
}
