import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { GraphqlHealthIndicator } from './graphql.health.indicator';
import { HealthController } from './health.controller';

@Module({
  imports: [TerminusModule, HttpModule],
  controllers: [HealthController],
  providers: [
    {
      provide: GraphqlHealthIndicator,
      useFactory: (httpService: HttpService) => {
        return new GraphqlHealthIndicator(
          httpService,
          process.env.Iplan_BFF_Gql_Url,
        );
      },
      inject: [HttpService],
    },
  ],
})
export class HealthModule {}
