import { registerAs } from '@nestjs/config';

import { loadAppConfig } from './app';
import { loadDbConfig } from './database';
import { loadSwaggerConfig } from './swagger';
import { loadTcpConfig } from './tcp';

export default registerAs('config', () => ({
  ...loadAppConfig(),
  ...loadDbConfig(),
  ...loadSwaggerConfig(),
  profileBaseURL: process.env.PROFILE_BASE_URL,
  ...loadTcpConfig(),
}));
