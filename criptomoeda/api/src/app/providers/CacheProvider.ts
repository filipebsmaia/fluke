import Redis, { Redis as RedisClient } from "ioredis";
import cacheConfig from "@config/cache";

const client = new Redis(cacheConfig);

interface ICacheSave {
  key: string;
  value: any;
  expires?: number;
}

export async function save({ key, value, expires }: ICacheSave): Promise<void> {
  if (expires) {
    await client.set(key, JSON.stringify(value), "ex", expires);
    return;
  }
  await client.set(key, JSON.stringify(value));
}

export async function recover<T>(key: string): Promise<T | null> {
  const data = await client.get(key);
  if (!data) {
    return null;
  }
  const parsedData = JSON.parse(data) as T;
  return parsedData;
}

export async function invalidate(key: string): Promise<void> {
  await client.del(key);
}

export async function invalidatePrefix(prefix: string): Promise<void> {
  const keys = await client.keys(`${prefix}:*`);

  const pipeline = client.pipeline();

  keys.forEach((key) => {
    pipeline.del(key);
  });

  await pipeline.exec();
}
