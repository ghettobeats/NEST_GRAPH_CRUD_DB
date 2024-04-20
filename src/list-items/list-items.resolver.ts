import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ListItemsService } from './list-items.service';
import { ListItem } from './entities/list-item.entity';
import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { jwtAuthguard } from 'src/auth/guards/jwt.auth.guard';

@Resolver(() => ListItem)
@UseGuards(jwtAuthguard)
export class ListItemsResolver {
  constructor(private readonly listItemsService: ListItemsService) {}

  @Mutation(() => ListItem)
  createListItem(@Args('createListItemInput') createListItemInput: CreateListItemInput
  //!Se puede pedir el usuario como en todos los otros resolvers
  ): Promise<ListItem>{
    return this.listItemsService.create(createListItemInput);
  }

  // @Query(() => [ListItem], { name: 'listItems' })
  // findAll() {
  //   return this.listItemsService.findAll();
  // }

  @Query(() => ListItem, { name: 'listItem' })
 async findOne(@Args('id', { type: () => String }, ParseUUIDPipe) id: string): Promise<ListItem>{
    return this.listItemsService.findOne(id);
  }

  // @Mutation(() => ListItem)
  // updateListItem(@Args('updateListItemInput') updateListItemInput: UpdateListItemInput) {
  //   return this.listItemsService.update(updateListItemInput.id, updateListItemInput);
  // }

  // @Mutation(() => ListItem)
  // removeListItem(@Args('id', { type: () => Int }) id: number) {
  //   return this.listItemsService.remove(id);
  // }
}
