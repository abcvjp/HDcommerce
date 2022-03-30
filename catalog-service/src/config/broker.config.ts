import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('broker', () => {
  const { BROKER_HOST, BROKER_PORT } = process.env;
  const config = {
    client: {
      clientId: 'catalog',
      brokers: [`${BROKER_HOST}:${BROKER_PORT}`],
    },
    consumer: {
      groupId: 'catalog-consumer',
    },
  };
  const schema = Joi.object({
    client: Joi.object({
      clientId: Joi.string(),
      brokers: Joi.array().items(Joi.string()),
    }),
    consumer: Joi.object({
      groupId: Joi.string(),
    }),
  });
  const validationResult = schema.validate(config);
  if (validationResult.error) {
    throw Error(`Validate db config: ${validationResult.error.message}`);
  }
  return config;
});
