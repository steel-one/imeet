import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  Application,
  ApplicationGrpcService,
  ListReq,
} from 'proto-ts/application';
import { map, Observable } from 'rxjs';
import { APPLICATIONS_GRPC_SERVICE_TOKEN } from './applications.module';

export const APPLICATIONS_SERVICE_TOKEN = 'APPLICATIONS_SERVICE_TOKEN';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject(APPLICATIONS_GRPC_SERVICE_TOKEN)
    private readonly applicationGrpcService: ApplicationGrpcService,
  ) {}

  async getManyAndCount(
    jwt: string,
    args: ListReq,
  ): Promise<
    Observable<{
      list: Application[];
      totalCount: number;
    }>
  > {
    try {
      const metadata = new Metadata();
      metadata.add('Authorization', jwt);
      return this.applicationGrpcService.list(args, metadata).pipe(
        map((response) => ({
          list: response.list || [],
          totalCount: response.totalCount,
        })),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
