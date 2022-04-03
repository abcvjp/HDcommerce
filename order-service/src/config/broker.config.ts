import { registerAs } from '@nestjs/config';
// import * as Joi from 'joi';

export default registerAs('broker', () => {
  const { BROKER_HOST, BROKER_PORT, BROKER_API_KEY, BROKER_API_SECRET } =
    process.env;
  const config = {
    client: {
      clientId: 'order',
      brokers: [`${BROKER_HOST}:${BROKER_PORT}`],
      ssl: true,
      sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: BROKER_API_KEY,
        password: BROKER_API_SECRET,
      },
    },
    consumer: {
      groupId: 'order-consumer',
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
