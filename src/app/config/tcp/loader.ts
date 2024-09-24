import { TcpClientOptions, Transport } from '@nestjs/microservices';

type Tcp = {
  tcp: TcpClientOptions;
};

export const loadTcpConfig = (): Tcp => ({
  tcp: {
    transport: Transport.TCP,
    options: {
      host: process.env.TCP_HOST,
      port: +process.env.TCP_PORT,
    },
  },
});
