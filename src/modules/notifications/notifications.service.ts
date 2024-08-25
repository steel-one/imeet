import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { map, Observable } from 'rxjs';
import {
  ListReq,
  Notification,
  NotificationGrpcService,
} from '../../../proto-ts/notification';
import { NOTIFICATIONS_GRPC_SERVICE_TOKEN } from './notifications.module';

export const NOTIFICATIONS_SERVICE_TOKEN = 'NOTIFICATIONS_SERVICE_TOKEN';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject(NOTIFICATIONS_GRPC_SERVICE_TOKEN)
    private readonly notificationsGrpcService: NotificationGrpcService,
  ) {}

  async getManyAndCount(
    jwt: string,
    args: ListReq,
  ): Promise<
    Observable<{
      list: Notification[];
      totalCount: number;
    }>
  > {
    try {
      const metadata = new Metadata();
      metadata.add('Authorization', jwt);
      return this.notificationsGrpcService.list(args, metadata).pipe(
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
