import { Module } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { COMMUNICATION_SERVICE_TOKEN } from '../../grpc.module';
import { NotificationsResolver } from './notifications.resolver';
import {
  NOTIFICATIONS_SERVICE_TOKEN,
  NotificationsService,
} from './notifications.service';

export const NOTIFICATIONS_GRPC_SERVICE_TOKEN =
  'NOTIFICATIONS_GRPC_SERVICE_TOKEN';

@Module({
  providers: [
    {
      provide: NOTIFICATIONS_GRPC_SERVICE_TOKEN,
      useFactory: (client: ClientGrpc) =>
        client.getService('NotificationGrpcService'),
      inject: [COMMUNICATION_SERVICE_TOKEN],
    },
    {
      provide: NOTIFICATIONS_SERVICE_TOKEN,
      useFactory: (service) => new NotificationsService(service),
      inject: [NOTIFICATIONS_GRPC_SERVICE_TOKEN],
    },
    NotificationsResolver,
  ],
})
export class NotificationsModule {}
