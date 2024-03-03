import { Injectable } from '@nestjs/common';
import { CreateListItemInput } from './dto/create-list-item.input';
import { UpdateListItemInput } from './dto/update-list-item.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ListItem } from './entities/list-item.entity';

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

  findAll() {
    return `This action returns all listItems`;
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
}
