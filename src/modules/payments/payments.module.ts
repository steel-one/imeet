import { Module } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { DOMAIN_SERVICE_TOKEN } from 'src/grpc.module';
import { PaymentsResolver } from './payments.resolver';
import { PAYMENTS_SERVICE_TOKEN, PaymentsService } from './payments.service';

export const PAYMENTS_GRPC_SERVICE_TOKEN = 'PAYMENTS_GRPC_SERVICE_TOKEN';

@Module({
  providers: [
    {
      provide: PAYMENTS_GRPC_SERVICE_TOKEN,
      useFactory: (client: ClientGrpc) =>
        client.getService('PaymentGrpcService'),
      inject: [DOMAIN_SERVICE_TOKEN],
    },
    {
      provide: PAYMENTS_SERVICE_TOKEN,
      useFactory: (service) => new PaymentsService(service),
      inject: [PAYMENTS_GRPC_SERVICE_TOKEN],
    },
    PaymentsResolver,
  ],
})
export class PaymentsModule {}
