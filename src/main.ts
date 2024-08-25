// tslint: disable
// Important! config should be loaded before application module
// other way all env values will be undefined
import * as dotenv from 'dotenv';
dotenv.config({ path: `envs/${process.env.ENVIRONMENT}.env` });
// tslint: enable
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as bodyParser from 'body-parser';
import { AppModule } from './app.module';
import { grpcClientOptions } from './common/gRPC/grpc-client.options';
import { mergeGrpcOptions } from './common/gRPC/grpc-functions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '100mb' }));
  app.enableCors();
  const configService: ConfigService = app.get(ConfigService);
  /** TODO: Remove this once base development is finished
   * (FOR gRPC ServerReflection) */
  app.connectMicroservice(mergeGrpcOptions([grpcClientOptions]), {
    inheritAppConfig: true,
  });
  await app.startAllMicroservices();
  await app.listen(configService.get('Iplan_BFF_App_Port'));
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
