import Redis, { Redis as RedisClient } from 'ioredis';

import cacheConfig from '@config/cache';
import ICacheProvider from '../models/ICacheProvider';

export default class RedisCacheProvider implements ICacheProvider {
  private client: RedisClient;

  constructor() {
    this.client = new Redis(cacheConfig.config.redis);
  }

  public async set(key: string, value: any): Promise<void> {
    await this.client.set(key, JSON.stringify(value));
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = await this.client.get(key);

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }

  public async expiresIn(key: string, seconds: number): Promise<void> {
    this.client.expire(key, seconds);
  }

  public async invalidateAll(): Promise<void> {
    const allKeys = await this.client.keys(`*:*`);

    const pipeline = this.client.pipeline();

    allKeys.forEach(key => {
      pipeline.del(key);
    });

    await pipeline.exec();
  }
}
