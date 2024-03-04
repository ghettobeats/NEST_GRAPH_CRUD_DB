import { Injectable } from '@nestjs/common';
import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListItem } from './entities/list-item.entity';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { List } from 'src/list/entities/list.entity';

@Injectable()
export class ListItemsService {
  
  constructor(
    @InjectRepository(ListItem) 
    private readonly listItemRepository: Repository<ListItem>
  ){ }
  async create(createListItemInput: CreateListItemInput): Promise<ListItem> {
    const {listId, itemId, ...rest} = createListItemInput
    const record = await this.listItemRepository.create({
...rest,
  item:{id:itemId},
  list:{ id: listId}
    })
    return this.listItemRepository.save(record);
  }

  async findAll(
    list: List, paginationArgs: PaginationArgs, searchArgs: SearchArgs    
  ): Promise<ListItem[]> {
    const {limit, offset} = paginationArgs;
    const {search} = searchArgs;
    const queryBuilder = this.listItemRepository.createQueryBuilder('ListItem')
    .innerJoin('ListItem.item', 'item')
    .take(limit)
    .skip(offset)
    .where(`"listId" = :listId`, {listId: list.id});

    if(search){
      queryBuilder.andWhere('LOWER(item.name) like :name',{ name: '%${ search.toLowerCase()}%'})
    }


    return queryBuilder.getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} listItem`;
  }

  update(id: number, updateListItemInput: UpdateListItemInput) {
    return `This action updates a #${id} listItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} listItem`;
  }
  async countListItemByList(list: List) : Promise<number>{
    return await this.listItemRepository.count({
      where:{
        list:{
          id: list.id
        }
      }
    })
  }
}
