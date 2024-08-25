import { Inject } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GetManyArgs } from '../../utils/args.dto';
import { LocaleManyAndCountModel, LocaleModel } from './locale.model';
import { LOCALES_SERVICE_TOKEN, LocalesService } from './locales.service';

@Resolver(() => LocaleModel)
export class LocalesResolver {
  constructor(
    @Inject(LOCALES_SERVICE_TOKEN)
    private readonly srv: LocalesService,
  ) {}

  @Query(() => LocaleManyAndCountModel)
  async locales(
    @Context() context,
    @Args('args', { type: () => GetManyArgs, nullable: true }) args,
  ) {
    const jwt = context.req.headers.authorization;
    return this.srv.getManyAndCount(jwt, args);
  }

  @Query(() => LocaleModel)
  async locale(@Context() context, @Args('id', { type: () => String }) id) {
    const jwt = context.req.headers.authorization;
    return this.srv.getOne(jwt, id);
  }
}
