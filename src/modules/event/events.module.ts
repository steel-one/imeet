import { Module } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { DOMAIN_SERVICE_TOKEN } from 'src/grpc.module';
import { EventsResolver } from './events.resolver';
import { EVENTS_SERVICE_TOKEN, EventsService } from './events.service';

export const EVENTS_GRPC_SERVICE_TOKEN = 'EVENTS_GRPC_SERVICE_TOKEN';

@Module({
  providers: [
    {
      provide: EVENTS_GRPC_SERVICE_TOKEN,
      useFactory: (client: ClientGrpc) => client.getService('EventGrpcService'),
      inject: [DOMAIN_SERVICE_TOKEN],
    },
    {
      provide: EVENTS_SERVICE_TOKEN,
      useFactory: (service) => new EventsService(service),
      inject: [EVENTS_GRPC_SERVICE_TOKEN],
    },
    EventsResolver,
  ],
})
export class EventsModule {}
