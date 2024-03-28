import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  @Query(() => [User])
  public async users(): Promise<User[]> {
    return await this.repository.find({
      relations: ['events'],
    });
  }

  @Query(() => User)
  public async user(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<User> {
    return await this.repository.findOneOrFail({
      where: {
        id,
      },
      relations: ['events'],
    });
  }
}
