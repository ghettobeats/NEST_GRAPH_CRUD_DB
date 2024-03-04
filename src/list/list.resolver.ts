import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { ListService } from './list.service';
import { List } from './entities/list.entity';
import { CreateListInput, UpdateListInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { jwtAuthguard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs, SearchArgs } from '../common/dto/args';
import { ListItem } from 'src/list-items/entities/list-item.entity';
import { ListItemsService } from 'src/list-items/list-items.service';

@Resolver(() => List)
@UseGuards(jwtAuthguard)
export class ListResolver {
  constructor(
    private readonly listService: ListService, 
    private readonly listItemService: ListItemsService
    ) {}

  @Mutation(() => List, {name: 'CrearLista'})
  createList(@Args('createListInput') createListInput: CreateListInput,
  @CurrentUser() user: User) {
    return this.listService.create(createListInput,user);
  }

  @Query(() => [List], { name: 'listas' })
  findAll(
    @CurrentUser() user:User, 
    @Args() paginationArgs: PaginationArgs, 
    @Args() searchArgs: SearchArgs
  ) {
    return this.listService.findAll(user,paginationArgs,searchArgs);
  }

  @Query(() => List, { name: 'lista' })
  findOne(@Args('id', { type: () => String }) id: string,
  @CurrentUser() user:User) {
    return this.listService.findOne(id,user);
  }

  @Mutation(() => List)
  updateList(@Args('updateListInput') updateListInput: UpdateListInput,
  @CurrentUser() user:User
  ) {
    return this.listService.update(updateListInput.id, updateListInput,user);
  }

  @Mutation(() => List)
  removeList(@Args('id', { type: () => String }) id: string,
  @CurrentUser() user:User) {
    return this.listService.remove(id,user);
  }



  @ResolveField(() => [ListItem], {name: 'Items'})
  async getListItem(
    @Parent() list : List,
    @Args() paginationArgs: PaginationArgs, 
    @Args() searchArgs: SearchArgs
  ): Promise<ListItem[]>{
    return  this.listItemService.findAll(list,paginationArgs,searchArgs);
   
  }
  @ResolveField(()=> Number, {name: 'TotalItems'})
  async countListItemByList(
    @Parent() list: List
  ): Promise<Number>{
return this.listItemService.countListItemByList(list);
  }
}
