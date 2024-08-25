import { GrpcOptions } from '@nestjs/microservices';
import { addReflectionToGrpcConfig } from 'nestjs-grpc-reflection';

/** TODO: Remove this once base development is finished
 * (FOR gRPC ServerReflection) */
export function mergeGrpcOptions(optionsList: GrpcOptions[]): GrpcOptions {
  const grpcOptions = optionsList.reduce<GrpcOptions>(
    (accumulatedValue, currentValue, currentIndex) => {
      if (currentIndex > 0) {
        accumulatedValue.options.package = [
          ...accumulatedValue.options.package,
          ...currentValue.options.package,
        ];

        accumulatedValue.options.protoPath = [
          ...accumulatedValue.options.protoPath,
          ...currentValue.options.protoPath,
        ];
      }
      return accumulatedValue;
    },
    optionsList[0],
  );

  return addReflectionToGrpcConfig(grpcOptions);
}
