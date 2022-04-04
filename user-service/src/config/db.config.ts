import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('db', () => {
  const dbConfig = {
    type: process.env.DB_TYPE || 'mongo',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  };
  const schema = Joi.object({
    type: Joi.string().required(),
    host: Joi.string().required(),
    port: Joi.number().port().required(),
    username: Joi.string().required(),
    password: Joi.string().required(),
    database: Joi.string().required(),
  });
  const validationResult = schema.validate(dbConfig);
  if (validationResult.error) {
    throw Error(`Validate db config: ${validationResult.error.message}`);
  }
  return dbConfig;
});
