import { Global } from '@nestjs/common';
import { ConfigService as Config } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AppOptions } from './app';
import { SwaggerOptions } from './swagger';
import { TcpClientOptions } from '@nestjs/microservices';

@Global()
export class ConfigService {
  constructor(private config: Config) {}

  get app(): AppOptions {
    return this.config.get<AppOptions>('config.app');
  }

  get database(): TypeOrmModuleOptions {
    return this.config.get<TypeOrmModuleOptions>('config.database');
  }

  get swagger(): SwaggerOptions {
    return this.config.get<SwaggerOptions>('config.swagger');
  }

  get profileBaseURL(): string {
    return this.config.get('config.profileBaseURL');
  }

  get tcp(): TcpClientOptions {
    return this.config.get<TcpClientOptions>('config.tcp');
  }
}
