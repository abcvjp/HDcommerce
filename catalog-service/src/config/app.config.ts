import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('app', () => {
  const config = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
  };
  const schema = Joi.object({
    environment: Joi.string()
      .valid('development', 'production', 'test', 'provision')
      .required(),
    port: Joi.number().required(),
  });
  const validationResult = schema.validate(config);
  if (validationResult.error) {
    throw Error(`Validate app config: ${validationResult.error.message}`);
  } else return config;
});
