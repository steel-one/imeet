import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  ListReq,
  Locale,
  LocaleGrpcService,
  OneReq,
  OneRes,
} from 'proto-ts/locale';
import { map, Observable } from 'rxjs';
import { LOCALES_GRPC_SERVICE_TOKEN } from './locales.module';

export const LOCALES_SERVICE_TOKEN = 'LOCALES_SERVICE_TOKEN';

@Injectable()
export class LocalesService {
  constructor(
    @Inject(LOCALES_GRPC_SERVICE_TOKEN)
    private readonly localeGrpcService: LocaleGrpcService,
  ) {}

  async getManyAndCount(
    jwt: string,
    args: ListReq,
  ): Promise<
    Observable<{
      list: Locale[];
      totalCount: number;
    }>
  > {
    try {
      const metadata = new Metadata();
      metadata.add('Authorization', jwt);
      return this.localeGrpcService.list(args, metadata).pipe(
        map((response) => ({
          list: response.list || [],
          totalCount: response.totalCount,
        })),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }

  async getOne(jwt: string, args: OneReq): Promise<Observable<OneRes>> {
    try {
      const metadata = new Metadata();
      metadata.add('Authorization', jwt);
      return this.localeGrpcService.one(args, metadata).pipe(
        map((response) => ({
          node: response.node || null,
        })),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
