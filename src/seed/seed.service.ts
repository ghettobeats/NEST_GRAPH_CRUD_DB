import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../users/entities/user.entity';
import { Item } from '../items/entities/item.entity';
import { SEED_ITEMS, SEED_USERS } from './data_seed/seed-data';

import { UsersService } from '../users/users.service';
import { ItemsService } from '../items/items.service';
import { ListItem } from '../list-items/entities/list-item.entity';
import { List } from '../list/entities/list.entity';

@Injectable()
export class SeedService {

private isProd: boolean;

constructor(
    configureService: ConfigService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
     @InjectRepository(ListItem) 
    private readonly listItemRepository: Repository<ListItem>,
     @InjectRepository(List) 
    private readonly listRepository: Repository<List>,
    private readonly userService: UsersService,
    private readonly itemService: ItemsService
    
    ) {
this.isProd = configureService.get('STATE') === 'prod'
}

async executeSeed(){

    if(this.isProd){
        throw new UnauthorizedException('We cannot run SEED on PROD')
    }
    
    await this.deleteDB();    
    const user  = await this.loadUser();
    //TODO: crear item
    await this.loadItems(user);



    return true;
}
async deleteDB(){


    // delete listItem
await this.listItemRepository.createQueryBuilder()
    .delete()
    .where({})
    .execute();
    // delelte list
await this.listRepository.createQueryBuilder()
    .delete()
    .where({})
    .execute();
    // delete items
    await this.itemRepository.createQueryBuilder()
    .delete()
    .where({})
    .execute();
    // delete users
    await this.userRepository.createQueryBuilder()
    .delete()
    .where({})
    .execute();
}

async loadUser(): Promise<User>{
  const users = []
for(const user of SEED_USERS){
    users.push(this.userService.create(user))
}
return users[0]
}
async loadItems(user: User): Promise<void>{
    const itemsPromises = [];
    for(const item of SEED_ITEMS){
        itemsPromises.push(this.itemService.create(item, user))
    }
  await Promise.all(itemsPromises)
}

}
