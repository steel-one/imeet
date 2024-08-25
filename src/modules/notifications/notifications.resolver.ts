import { Inject } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import {
  NotificationManyAndCountModel,
  NotificationModel,
} from './notification.model';

import { GetManyArgs } from 'src/utils/args.dto';
import {
  NOTIFICATIONS_SERVICE_TOKEN,
  NotificationsService,
} from './notifications.service';

@Resolver(() => NotificationModel)
export class NotificationsResolver {
  constructor(
    @Inject(NOTIFICATIONS_SERVICE_TOKEN)
    private readonly srv: NotificationsService,
  ) {}

  @Query(() => NotificationManyAndCountModel)
  async notifications(
    @Context() context,
    @Args('args', { type: () => GetManyArgs, nullable: true }) args,
  ) {
    const jwt = context.req.headers.authorization;
    return this.srv.getManyAndCount(jwt, args);
  }
}
