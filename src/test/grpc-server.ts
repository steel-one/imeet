import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { join } from 'path';

const notificationHandlers = {
  GetNotifications: (call, callback) => {
    const notifications = [
      {
        applicationNotificationId: '1',
        applicationId: '1',
        title: 'Notification 1',
        body: 'This notification has been created',
        from: new Date('2018-06-01'),
        to: new Date('2018-07-01'),
      },
      {
        applicationNotificationId: '2',
        applicationId: '2',
        title: 'Notification 2',
        body: 'This notification has been created',
        from: new Date('2018-06-01'),
        to: new Date('2018-07-01'),
      },
    ];
    callback(null, { notifications });
  },
};

export function createGrpcServer(): grpc.Server {
  const protoPath = join(__dirname, 'protos/notification.proto');
  const packageDefinition = protoLoader.loadSync(protoPath, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const grpcObject = grpc.loadPackageDefinition(packageDefinition) as any;
  const notificationPackage = grpcObject.ApplicationAPINotifications;

  const server = new grpc.Server({});
  server.addService(
    notificationPackage.notification.service,
    notificationHandlers,
  );

  return server;
}
