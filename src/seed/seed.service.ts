import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Item } from '../items/entities/item.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {

private isProd: boolean;

constructor(
    configureService: ConfigService,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>
    
    ) {
this.isProd = configureService.get('STATE') === 'prod'
}

async executeSeed(){

    if(this.isProd){
        throw new UnauthorizedException('We cannot run SEED on PROD')
    }
    //limpiar la base de datos
    this.deleteDB();
    //crear usuario 
    //crear item
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
}
