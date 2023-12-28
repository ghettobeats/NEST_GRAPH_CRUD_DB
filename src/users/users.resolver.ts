import { ParseUUIDPipe, UseGuards } from '@nestjs/common';

import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { rolesArgs } from './dto/args/roles.args';
import { jwtAuthguard } from '../auth/guards/jwt.auth.guard';
import { CurrentUser } from '../auth/decorator/current-user.decorator';
import { roles } from 'src/auth/enums/valid-role.enum';



@Resolver(() => User)
@UseGuards(jwtAuthguard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  
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

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  @Mutation(() => User, {name: "block_user"})
  block(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
        @CurrentUser([roles.admin]) user: User) {
    return this.usersService.block(id);
  }
}
