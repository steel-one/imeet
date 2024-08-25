import { Inject } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GetManyArgs } from '../../utils/args.dto';
import { UserManyAndCountModel, UserModel } from './user.model';
import { USERS_SERVICE_TOKEN, UsersService } from './users.service';

@Resolver(() => UserModel)
export class UsersResolver {
  constructor(
    @Inject(USERS_SERVICE_TOKEN)
    private readonly srv: UsersService,
  ) {}

  @Query(() => UserManyAndCountModel)
  async users(
    @Context() context,
    @Args('args', { type: () => GetManyArgs, nullable: true }) args,
  ) {
    const jwt = context.req.headers.authorization;
    return this.srv.getManyAndCount(jwt, args);
  }
}
