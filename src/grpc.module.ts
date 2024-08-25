import { credentials } from '@grpc/grpc-js';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

export const DOMAIN_SERVICE_TOKEN = 'DOMAIN_SERVICE';
export const COMMUNICATION_SERVICE_TOKEN = 'COMMUNICATION_SERVICE';

export const GrpcClientsModule = ClientsModule.registerAsync({
  clients: [
    {
      useFactory: (domainMicroserviceUrl) => {
        return {
          name: DOMAIN_SERVICE_TOKEN,
          transport: Transport.GRPC,
          options: {
            url: domainMicroserviceUrl,
            package: ['event', 'locale', 'payment', 'user'],
            protoPath: [
              join(__dirname, '../protos/event.proto'),
              join(__dirname, '../protos/locale.proto'),
              join(__dirname, '../protos/payment.proto'),
              join(__dirname, '../protos/user.proto'),
            ],
            credentials:
              process.env.NODE_ENV !== 'production'
                ? credentials.createInsecure()
                : credentials.createSsl(),
          },
        };
      },
      inject: ['DOMAIN_SERVICE_URL'],
      extraProviders: [
        {
          provide: 'DOMAIN_SERVICE_URL',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return configService.get('domain').endpoint;
          },
        },
      ],
      name: 'DOMAIN_SERVICE',
    },
    {
      useFactory: (communicationMicroserviceUrl) => {
        return {
          name: COMMUNICATION_SERVICE_TOKEN,
          transport: Transport.GRPC,
          options: {
            url: communicationMicroserviceUrl,
            package: ['application', 'notification'],
            protoPath: [
              join(__dirname, '../protos/application.proto'),
              join(__dirname, '../protos/notification.proto'),
            ],
            credentials:
              process.env.NODE_ENV !== 'production'
                ? credentials.createInsecure()
                : credentials.createSsl(),
          },
        };
      },
      inject: ['COMMUNICATION_SERVICE_URL'],
      extraProviders: [
        {
          provide: 'COMMUNICATION_SERVICE_URL',
          inject: [ConfigService],
          useFactory: (configService: ConfigService) => {
            return configService.get('communication').endpoint;
          },
        },
      ],
      name: 'COMMUNICATION_SERVICE',
    },
  ],
  isGlobal: true,
});
