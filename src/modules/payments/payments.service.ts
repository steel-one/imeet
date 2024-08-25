import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import {
  ListReq,
  OneReq,
  OneRes,
  Payment,
  PaymentGrpcService,
} from 'proto-ts/payment';
import { map, Observable } from 'rxjs';
import { PAYMENTS_GRPC_SERVICE_TOKEN } from './payments.module';

export const PAYMENTS_SERVICE_TOKEN = 'PAYMENTS_SERVICE_TOKEN';

@Injectable()
export class PaymentsService {
  constructor(
    @Inject(PAYMENTS_GRPC_SERVICE_TOKEN)
    private readonly paymentGrpcService: PaymentGrpcService,
  ) {}

  async getManyAndCount(
    jwt: string,
    args: ListReq,
  ): Promise<
    Observable<{
      list: Payment[];
      totalCount: number;
    }>
  > {
    try {
      const metadata = new Metadata();
      metadata.add('Authorization', jwt);
      return this.paymentGrpcService.list(args, metadata).pipe(
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
      return this.paymentGrpcService.one(args, metadata).pipe(
        map((response) => ({
          payment: response.payment || null,
        })),
      );
    } catch (error) {
      throw new RpcException(error);
    }
  }
}
