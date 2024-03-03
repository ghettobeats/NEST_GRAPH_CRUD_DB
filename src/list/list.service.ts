import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateListInput,UpdateListInput } from './dto/inputs';
import { List } from './entities/list.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { PaginationArgs, SearchArgs } from '../common/dto/args';

@Injectable()
export class ListService {  
  constructor(
    @InjectRepository(List)
   private readonly listRepository: Repository<List>
   ) {  }

 async create(createListInput: CreateListInput, user: User): Promise<List> {
    const lista = this.listRepository.create({...createListInput, user});
    return await this.listRepository.save(lista);
  }

  async findAll( user: User, 
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs): Promise<List[]> {  
      const {limit, offset} = paginationArgs;
      const {search} = searchArgs;    
    const queryBuilder = await this.listRepository.createQueryBuilder('list')
    .offset(offset)
    .limit(limit)
    .where(`"userId" = :userId`, {userId: user.id});
    if(search){     
      queryBuilder.andWhere('LOWER(name) like :name', {name: `%${search.toLowerCase()}%`});
    }
    return queryBuilder.getMany();
    // return this.listRepository.find({
    //   where:{
    //     user: {
    //       id: user.id
    //     }
    //   }
    // })
  }

  async findOne(id: string, user: User): Promise<List> {
    const list = await this.listRepository.findOneBy({id, user:{id: user.id}})
    if(!list){
      throw new NotFoundException(`not found ${id}`);
    }
    return list;
  }

  async update(id: string, updateListInput: UpdateListInput, user:User): Promise<List> {
    await this.findOne(id, user);
    const list = await this.listRepository.preload(updateListInput);
    if(!list)
      throw new NotFoundException(`not found ${id}`)
    return this.listRepository.save(list);
  }
//!Realmente deberia ser un update no un remove....
  async remove(id: string,user:User): Promise<List>{
    const item = await this.findOne(id, user);
    await this.listRepository.remove(item);
    return item;
  }
  //Conteo de lista para usar como resolveField en otro resolve
  async countListByUser(user: User) : Promise<number>{
    return await this.listRepository.count({
      where:{
        user:{
          id: user.id
        }
      }
    })
  }
}
