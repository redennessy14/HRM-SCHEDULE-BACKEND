import * as Joi from 'joi';

export const tcpConfigSchema = {
  TCP_HOST: Joi.string().required(),
  TCP_PORT: Joi.number().required(),
};
