import { Inject } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GetManyArgs } from '../../utils/args.dto';
import { EventManyAndCountModel, EventModel } from './event.model';
import { EVENTS_SERVICE_TOKEN, EventsService } from './events.service';

@Resolver(() => EventModel)
export class EventsResolver {
  constructor(
    @Inject(EVENTS_SERVICE_TOKEN)
    private readonly srv: EventsService,
  ) {}

  @Query(() => EventManyAndCountModel)
  async events(
    @Context() context,
    @Args('args', { type: () => GetManyArgs, nullable: true }) args,
  ) {
    const jwt = context.req.headers.authorization;
    return this.srv.getManyAndCount(jwt, args);
  }
}
