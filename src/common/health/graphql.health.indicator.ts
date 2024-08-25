import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  HealthCheckError,
  HealthIndicator,
  HealthIndicatorResult,
} from '@nestjs/terminus';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GraphqlHealthIndicator extends HealthIndicator {
  constructor(
    private readonly httpService: HttpService,
    private readonly httpLink: string,
  ) {
    super();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    try {
      const response = await lastValueFrom(
        this.httpService.post(this.httpLink, {
          query: '{ __schema { queryType { name } } }',
        }),
      );

      const isHealthy = response.status === 200;
      const result = this.getStatus(key, isHealthy);

      if (isHealthy) {
        return result;
      }
      throw new HealthCheckError('GraphQL health check failed', result);
    } catch (error) {
      throw new HealthCheckError(
        'GraphQL health check failed',
        this.getStatus(key, false),
      );
    }
  }
}
