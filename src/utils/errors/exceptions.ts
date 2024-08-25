import { status as GrpcStatusCode } from '@grpc/grpc-js';
import { RpcException } from '@nestjs/microservices';

export class IlRpcException extends RpcException {
  constructor(
    public readonly code: GrpcStatusCode,
    error?: string | any,
  ) {
    super({
      code,
      message: JSON.stringify({
        type: typeof error === 'string' ? 'string' : 'object',
        error,
      }),
    });
  }
}

export class DuplicateKeyException extends IlRpcException {
  constructor(entity: string, field: string, error?: any) {
    super(GrpcStatusCode.ALREADY_EXISTS, { entity, field, error });
  }
}

export class NoMasterEntityFoundException extends IlRpcException {
  constructor(
    masterEntity: string,
    entity: string,
    field: string,
    error?: any,
  ) {
    super(GrpcStatusCode.NOT_FOUND, { masterEntity, entity, field, error });
  }
}

export class EntityNotFoundException extends IlRpcException {
  constructor(
    entity: string,
    payload: { id: number | string; customerId: number },
  ) {
    super(GrpcStatusCode.NOT_FOUND, { entity, payload });
  }
}
