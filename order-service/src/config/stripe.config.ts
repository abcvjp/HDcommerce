import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';

export default registerAs('stripe', () => {
  const config = {
    secretKey: process.env.STRIPE_SECRET_KEY,
  };
  const schema = Joi.object({
    secretKey: Joi.string().required(),
  });
  const validationResult = schema.validate(config);
  if (validationResult.error) {
    throw Error(`Validate stripe config: ${validationResult.error.message}`);
  } else return config;
});
