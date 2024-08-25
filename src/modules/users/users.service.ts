import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ListReq, User, UserGrpcService } from 'proto-ts/user';
import { map, Observable } from 'rxjs';
import { USERS_GRPC_SERVICE_TOKEN } from './users.module';

export const USERS_SERVICE_TOKEN = 'USERS_SERVICE_TOKEN';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USERS_GRPC_SERVICE_TOKEN)
    private readonly userGrpcService: UserGrpcService,
  ) {}

  async getManyAndCount(
    jwt: string,
    args: ListReq,
  ): Promise<
    Observable<{
      list: User[];
      totalCount: number;
    }>
  > {
    try {
      const metadata = new Metadata();
      metadata.add('Authorization', jwt);
      return this.userGrpcService.list(args, metadata).pipe(
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
