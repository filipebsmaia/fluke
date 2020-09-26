import { RedisOptions } from "ioredis";

export default {
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PASS || undefined,
} as RedisOptions;
