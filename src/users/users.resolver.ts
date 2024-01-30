import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { rolesArgs } from './dto/args/roles.args';
import { jwtAuthguard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { roles } from 'src/auth/enums/valid-role.enum';
import { UpdateUserInput } from './dto/inputs';
import { ItemsService } from '../items/items.service';
import { Item } from '../items/entities/item.entity';
import { PaginationArgs, SearchArgs } from '../common/dto/args';



@Resolver(() => User)
@UseGuards(jwtAuthguard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService, private readonly itemService: ItemsService) {}

  
  @Query(() => [User], { name: 'users' })
  findAll(
    @Args() validRoles: rolesArgs,
    @CurrentUser([roles.admin]) user: User
  ) : Promise<User[]>{
    return this.usersService.findAll(validRoles.roles);
  }

  @Query(() => User, { name: 'user' })
  findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([roles.admin]) user: User): Promise<User> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User, {name: 'UpdateUser'})
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([roles.admin]) user: User
    ): Promise<User> {   
      //!const {id} = updateUserInput desectruturacion TS  
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }

  @Mutation(() => User, {name: "block_user"})
  block(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
        @CurrentUser([roles.admin]) user: User) {
    return this.usersService.block(id,user);
  }

  @ResolveField(()=> Int, {name: 'itemCount'})   //!Asi es como se crea un campo de grahp partiendo de una funcion
  async itemCount(
    @CurrentUser([roles.admin]) adminUser: User,
    @Parent() user: User //!Parent trae los campos del modelo padre en este caso user porque tiene relacion
  ): Promise<number>{
    return this.itemService.countItemByUser(user);
  }

  @ResolveField(()=> [Item], {name: 'items'})
  async getItemByUser(
    @CurrentUser([roles.admin]) adminUser: User,
    @Parent() user: User,
    @Args() paginationArgs: PaginationArgs,
    @Args() searchArgs: SearchArgs
  ): Promise<Item[]>{
    return this.itemService.findAll(user, paginationArgs, searchArgs);
  }


}
