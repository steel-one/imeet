import { Module } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { COMMUNICATION_SERVICE_TOKEN } from 'src/grpc.module';
import { ApplicationsResolver } from './applications.resolver';
import {
  APPLICATIONS_SERVICE_TOKEN,
  ApplicationsService,
} from './applications.service';

export const APPLICATIONS_GRPC_SERVICE_TOKEN =
  'APPLICATIONS_GRPC_SERVICE_TOKEN';

@Module({
  providers: [
    {
      provide: APPLICATIONS_GRPC_SERVICE_TOKEN,
      useFactory: (client: ClientGrpc) =>
        client.getService('ApplicationGrpcService'),
      inject: [COMMUNICATION_SERVICE_TOKEN],
    },
    {
      provide: APPLICATIONS_SERVICE_TOKEN,
      useFactory: (service) => new ApplicationsService(service),
      inject: [APPLICATIONS_GRPC_SERVICE_TOKEN],
    },
    ApplicationsResolver,
  ],
})
export class ApplicationsModule {}
