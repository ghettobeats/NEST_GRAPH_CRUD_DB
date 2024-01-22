import { Mutation, Resolver } from '@nestjs/graphql';
import { SeedService } from './seed.service';

@Resolver()
export class SeedResolver {
  constructor(private readonly seedService: SeedService) {}


@Mutation(()=> Boolean, {description: "Setear data a una base de datos ", name: "SeedData"})
async executeSeed(): Promise<boolean>{
  return this.seedService.executeSeed();
}



}
