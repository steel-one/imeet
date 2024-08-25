import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Event, EventGrpcService, ListReq } from 'proto-ts/event';
import { map, Observable } from 'rxjs';
import { EVENTS_GRPC_SERVICE_TOKEN } from './events.module';

export const EVENTS_SERVICE_TOKEN = 'EVENTS_SERVICE_TOKEN';

@Injectable()
export class EventsService {
  constructor(
    @Inject(EVENTS_GRPC_SERVICE_TOKEN)
    private readonly eventGrpcService: EventGrpcService,
  ) {}

  async getManyAndCount(
    jwt: string,
    args: ListReq,
  ): Promise<
    Observable<{
      list: Event[];
      totalCount: number;
    }>
  > {
    try {
      const metadata = new Metadata();
      metadata.add('Authorization', jwt);
      return this.eventGrpcService.list(args, metadata).pipe(
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
