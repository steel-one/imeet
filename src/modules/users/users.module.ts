import { Module } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { DOMAIN_SERVICE_TOKEN } from 'src/grpc.module';
import { UsersResolver } from './users.resolver';
import { USERS_SERVICE_TOKEN, UsersService } from './users.service';

export const USERS_GRPC_SERVICE_TOKEN = 'USERS_GRPC_SERVICE_TOKEN';

@Module({
  providers: [
    {
      provide: USERS_GRPC_SERVICE_TOKEN,
      useFactory: (client: ClientGrpc) => client.getService('UserGrpcService'),
      inject: [DOMAIN_SERVICE_TOKEN],
    },
    {
      provide: USERS_SERVICE_TOKEN,
      useFactory: (service) => new UsersService(service),
      inject: [USERS_GRPC_SERVICE_TOKEN],
    },
    UsersResolver,
  ],
})
export class UsersModule {}
