import { registerAs } from '@nestjs/config';
// import * as Joi from 'joi';

export default registerAs('rpc', () => {
  const { CATALOG_SERVICE_HOST, CATALOG_SERVICE_RPC_PORT } = process.env;
  const config = {
    catalog: {
      host: CATALOG_SERVICE_HOST || 'catalog-service',
      port: CATALOG_SERVICE_RPC_PORT || 3001,
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
