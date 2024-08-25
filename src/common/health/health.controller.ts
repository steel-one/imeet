import { Controller, Get, Logger } from '@nestjs/common';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';
import { GraphqlHealthIndicator } from './graphql.health.indicator';

@Controller('health')
export class HealthController {
  logger = new Logger(HealthController.name);
  constructor(
    private health: HealthCheckService,
    private graphqlHealthIndicator: GraphqlHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  healthCheck() {
    return this.health.check([
      async () => this.graphqlHealthIndicator.isHealthy('graphql'),
    ]);
  }
}
