import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ListService } from './list.service';
import { List } from './entities/list.entity';
import { CreateListInput, UpdateListInput } from './dto/inputs';
import { UseGuards } from '@nestjs/common';
import { jwtAuthguard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Resolver(() => List)
@UseGuards(jwtAuthguard)
export class ListResolver {
  constructor(private readonly listService: ListService) {}

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
}
