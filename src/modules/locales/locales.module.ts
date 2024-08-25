import { Module } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { DOMAIN_SERVICE_TOKEN } from 'src/grpc.module';
import { LocalesResolver } from './locales.resolver';
import { LOCALES_SERVICE_TOKEN, LocalesService } from './locales.service';

export const LOCALES_GRPC_SERVICE_TOKEN = 'LOCALES_GRPC_SERVICE_TOKEN';

@Module({
  providers: [
    {
      provide: LOCALES_GRPC_SERVICE_TOKEN,
      useFactory: (client: ClientGrpc) =>
        client.getService('LocaleGrpcService'),
      inject: [DOMAIN_SERVICE_TOKEN],
    },
    {
      provide: LOCALES_SERVICE_TOKEN,
      useFactory: (service) => new LocalesService(service),
      inject: [LOCALES_GRPC_SERVICE_TOKEN],
    },
    LocalesResolver,
  ],
})
export class LocalesModule {}
