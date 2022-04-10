import { registerAs } from '@nestjs/config';
// import * as Joi from 'joi';

export default registerAs('httpClient', () => {
  const { HTTP_CLIENT_TIMEOUT } = process.env;
  const config = {
    timeout: HTTP_CLIENT_TIMEOUT || 5000,
    maxRedirects: 5,
    clients: {
      userService: { baseURL: 'http://user-service:3000' },
      catalogService: { baseURL: 'http://catalog-service:3000' },
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
