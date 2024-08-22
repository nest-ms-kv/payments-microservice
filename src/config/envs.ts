import 'dotenv/config';
import * as joi from 'joi';

interface EnvVars {
  PORT: number;
  NATS_SERVERS: string;
  STRIPE_SECRET_KEY: string;
  STRIPE_PUBLIC_KEY: string;
  STRIPE_ENDPOINT_SECRET: string;
  STRIPE_SUCCESS_URL: string;
  STRIPE_CANCEL_URL: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().default(3000),
    NATS_SERVERS: joi.array().items(joi.string()).required(),
    STRIPE_SECRET_KEY: joi.string().required(),
    STRIPE_PUBLIC_KEY: joi.string().required(),
    STRIPE_ENDPOINT_SECRET: joi.string().required(),
    STRIPE_SUCCESS_URL: joi.string().required(),
    STRIPE_CANCEL_URL: joi.string().required(),
  })
  .unknown();

const { error, value } = envsSchema.validate({
  ...process.env,
  NATS_SERVERS: process.env.NATS_SERVERS?.split(','),
});

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const envVars: EnvVars = value;

export const envs = {
  port: envVars.PORT,
  natsServers: envVars.NATS_SERVERS,
  StripeSecretKey: envVars.STRIPE_SECRET_KEY,
  StripePublicKey: envVars.STRIPE_PUBLIC_KEY,
  StripeEndpointSecret: envVars.STRIPE_ENDPOINT_SECRET,
  StripeSuccessUrl: envVars.STRIPE_SUCCESS_URL,
  StripeCancelUrl: envVars.STRIPE_CANCEL_URL,
};
