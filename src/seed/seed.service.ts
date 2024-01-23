import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Item } from '../items/entities/item.entity';
import { Repository } from 'typeorm';
import { SEED_USERS } from './data_seed/seed-data';

@Injectable()
export class SeedService {

private isProd: boolean;

constructor(
    configureService: ConfigService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>,
    private readonly userService: UsersService
    
    ) {
this.isProd = configureService.get('STATE') === 'prod'
}

async executeSeed(){

    if(this.isProd){
        throw new UnauthorizedException('We cannot run SEED on PROD')
    }
    
    this.deleteDB();    
    const user  = await this.loadUser();
    //TODO: crear item



    return true;
}
async deleteDB(){
    await this.itemRepository.createQueryBuilder()
    .delete()
    .where({})
    .execute();

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

}
