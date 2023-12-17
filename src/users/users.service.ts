import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { User } from './entities/user.entity';
import { SignupInput } from 'src/auth/dto/inputs/signup.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { threadId } from 'worker_threads';
import { roles } from '../auth/enums/valid-role.enum';

@Injectable()
export class UsersService {

  private logger:Logger = new Logger('UsersService')

  constructor(
    @InjectRepository(User)
    private readonly userRepository : Repository<User>
  ){
    
  }
  async create(signupInput : SignupInput) : Promise<User>{
   try {
    //hashing pass
    const newUser = this.userRepository.create({
      ...signupInput,
      password: bcrypt.hashSync(signupInput.password, 10)
    })
    return await this.userRepository.save(newUser)

   } catch (error) {
    this.handlerDBErrors(error);
   }
  }

  async findAll(roles: roles[]): Promise<User[]> {
    if (roles.length == 0 ) return this.userRepository.find();
    return this.userRepository
            .createQueryBuilder()
            .where('ARRAY[roles] && ARRAY[:...roles]  ')
            .setParameter('roles', roles)
            .getMany()
  }

  async findOneByEmail(email: string) : Promise<User>{
   try {
     return await this.userRepository.findOneByOrFail({email})
   } catch (error) {
    throw new NotFoundException(`${email} not found` )
    // this.handlerDBErrors({
    //   code: 'error-01',
    //   detail: `${email} not found`
    // })
   }
  }

  async findOneById(id: string) : Promise<User>{
   try {
     return await this.userRepository.findOneByOrFail({id})
   } catch (error) {
    throw new NotFoundException(`${id} not found` )
   
   }
  }
  async findOne(id: string) : Promise<User>{
  throw new Error('method block not implement yet');
  }
  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  block(id: string): Promise<User> {
    throw new Error('method block not implement yet');
  }
   private handlerDBErrors(error: any): never{
  
    if(error.code === '23505' ){
      throw new BadRequestException(error.detail.replace('key ',''))
    }
    if(error.code==='error-01'){
       throw new BadRequestException(error.detail.replace('key ',''))
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Please check the server error')
   }
}
