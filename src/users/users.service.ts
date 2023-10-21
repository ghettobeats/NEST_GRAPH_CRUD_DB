import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/inputs/create-user.input';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './entities/user.entity';
import { SignupInput } from 'src/auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>
  ){
    
  }
  async create(signupInput : SignupInput) : Promise<User>{
   try {
    const newUser = this.userRepository.create(signupInput)
    return await this.userRepository.save(newUser)

   } catch (error) {
    throw new BadRequestException('algo salio mal')
   }
  }

  async findAll(): Promise<User[]> {
    return [];
  }

  findOne(id: string) : Promise<User>{
    throw new Error('method findOne not implement yet');
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error('method block not implement yet');
  }
}
