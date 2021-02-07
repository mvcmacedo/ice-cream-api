export default interface ICacheProvider {
  set(key: string, value: any): Promise<void>;
  get<T>(key: string): Promise<T | null>;
  expiresIn(key: string, seconds: number): Promise<void>;
  invalidateAll(): Promise<void>;
}
