import { Inject } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GetManyArgs } from '../../utils/args.dto';
import {
  ApplicationManyAndCountModel,
  ApplicationModel,
} from './application.model';
import {
  APPLICATIONS_SERVICE_TOKEN,
  ApplicationsService,
} from './applications.service';

@Resolver(() => ApplicationModel)
export class ApplicationsResolver {
  constructor(
    @Inject(APPLICATIONS_SERVICE_TOKEN)
    private readonly srv: ApplicationsService,
  ) {}

  @Query(() => ApplicationManyAndCountModel)
  async applications(
    @Context() context,
    @Args('args', { type: () => GetManyArgs, nullable: true }) args,
  ) {
    const jwt = context.req.headers.authorization;
    return this.srv.getManyAndCount(jwt, args);
  }
}
