import * as Joi from 'joi';

import { appConfigSchema } from './app';
import { databaseConfigSchema } from './database';
import { swaggerConfigSchema } from './swagger';
import { tcpConfigSchema } from './tcp';

export const configSchema = Joi.object({
  ...appConfigSchema,
  ...databaseConfigSchema,
  ...swaggerConfigSchema,
  PROFILE_BASE_URL: Joi.string().required(),
  ...tcpConfigSchema,
});
