import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { GrpcReflectionModule } from 'nestjs-grpc-reflection';
import { grpcClientOptions } from './common/gRPC/grpc-client.options';
import { HealthModule } from './common/health/health.module';
import config from './config';
import { GraphqlModule } from './graphql.module';
import { GrpcClientsModule } from './grpc.module';
import { ApplicationsModule } from './modules/application/applications.module';
import { EventsModule } from './modules/event/events.module';
import { LocalesModule } from './modules/locales/locales.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { UsersModule } from './modules/users/users.module';
import { GQLAuthGuard } from './utils/guards/gql-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ApplicationsModule,
    EventsModule,
    LocalesModule,
    NotificationsModule,
    PaymentsModule,
    UsersModule,
    GraphqlModule,
    HealthModule,
    JwtModule,
    GrpcClientsModule,
    /** TODO: Remove this once base development is finished
     * (FOR gRPC ServerReflection) */
    GrpcReflectionModule.register(grpcClientOptions),
  ],
  providers: [{ provide: APP_GUARD, useClass: GQLAuthGuard }],
})
export class AppModule {}
