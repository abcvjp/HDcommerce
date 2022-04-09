import { registerAs } from '@nestjs/config';
// import * as Joi from 'joi';

export default registerAs('jwt', () => {
  const { JWT_SECRET } = process.env;
  const config = {
    secret: JWT_SECRET || 'secretKey',
    signOptions: {
      expiresIn: '14d',
    },
  };
  // const schema = Joi.object({
  // client: Joi.object({
  // clientId: Joi.string(),
  // brokers: Joi.array().items(Joi.string()),
  // }),
  // consumer: Joi.object({
  // groupId: Joi.string(),
  // }),
  // });
  // const validationResult = schema.validate(config);
  // if (validationResult.error) {
  // throw Error(`Validate db config: ${validationResult.error.message}`);
  // }
  return config;
});
