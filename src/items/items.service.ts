import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemInput, UpdateItemInput } from './dto/inputs';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PaginationArgs } from '../common/dto/args/pagination.args';


@Injectable()
export class ItemsService {

  constructor(
    @InjectRepository(Item)
    private readonly itemsRepository: Repository<Item>){}

  async create(createItemInput: CreateItemInput, user: User) : Promise<Item>{
    const item = this.itemsRepository.create({...createItemInput, user});
    return await this.itemsRepository.save(item);
  }

 async findAll(
  user: User, pagination: PaginationArgs
 ) : Promise<Item[]>{
  const {limit, offset} = pagination;
    return await this.itemsRepository.find({
    take: limit,
    skip: offset,
       where: {       
        user: {
          id: user.id
        }
       }
    });
  }

  async findOne(id: string, user :User) : Promise<Item>{
    const item = await this.itemsRepository.findOneBy({id, user:{id : user.id}})
    if(!item)
    throw new NotFoundException(`not found ${id}`)
    //?item.user = user; forma no muy opcional de hacer la forma es usar lazy en la entidad...
    return item
  }

 async update(id: string, updateItemInput: UpdateItemInput, user:User) : Promise<Item>{

  await this.findOne(id, user);
  //? Como seria sin lazy en la entidad .preload({updateItemImput, user})
  const item = await this.itemsRepository.preload(updateItemInput);
  if(!item) 
  throw new NotFoundException(`not found ${id}`)

    return this.itemsRepository.save(item);
  }

  async remove(id: string, user: User): Promise<Item> {
    const item = await this.findOne(id, user);
    await this.itemsRepository.remove(item);
    return item;
  }

  //?conteo de items por usuarios
 async countItemByUser(user: User): Promise<number>{
 return this.itemsRepository.count({
  where: {
      user: {
        id: user.id
      }
  }
})
}

}
