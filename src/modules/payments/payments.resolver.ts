import { Inject } from '@nestjs/common';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import { GetManyArgs } from '../../utils/args.dto';
import { PaymentManyAndCountModel, PaymentModel } from './payment.model';
import { PAYMENTS_SERVICE_TOKEN, PaymentsService } from './payments.service';

@Resolver(() => PaymentModel)
export class PaymentsResolver {
  constructor(
    @Inject(PAYMENTS_SERVICE_TOKEN)
    private readonly srv: PaymentsService,
  ) {}

  @Query(() => PaymentManyAndCountModel)
  async payments(
    @Context() context,
    @Args('args', { type: () => GetManyArgs, nullable: true }) args,
  ) {
    const jwt = context.req.headers.authorization;
    return this.srv.getManyAndCount(jwt, args);
  }

  @Query(() => PaymentModel)
  async payment(@Context() context, @Args('id', { type: () => String }) id) {
    const jwt = context.req.headers.authorization;
    return this.srv.getOne(jwt, id);
  }
}
