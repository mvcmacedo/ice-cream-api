import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

export default class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData = {};

  public async set(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async get<T>(key: string): Promise<T | null> {
    const data = this.cache[key];

    if (!data) {
      return null;
    }

    const parsedData = JSON.parse(data);

    return parsedData;
  }

  public async expiresIn(key: string, seconds: number): Promise<void> {}

  public async invalidateAll(): Promise<void> {
    this.cache = {};
  }
}
