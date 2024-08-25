import { GrpcOptions, Transport } from '@nestjs/microservices';
import { readFileSync } from 'fs';
import { glob } from 'glob';

/** TODO: Remove this once base development is finished
 * (FOR gRPC ServerReflection) */
const GRPC_PORT = process.env.ConnectRT_CS_Grpc_Port || 50051;

const protoFiles = glob.globSync(`${process.cwd()}/**/*.proto`, {
  ignore: ['**/node_modules/**', '**/dist/**'],
});

const packages = protoFiles.reduce((packages, filePath) => {
  const fileContent = readFileSync(filePath);
  const packageName = fileContent.toString().match(/package (.*);/)?.[1];

  if (packageName) {
    packages.push(packageName);
  }

  return packages;
}, []);

export const grpcClientOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: packages,
    protoPath: protoFiles,
    url: `0.0.0.0:${GRPC_PORT}`,
  },
};
