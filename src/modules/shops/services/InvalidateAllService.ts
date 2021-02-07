import { inject, injectable } from 'tsyringe';

import ICacheProvider from '@shared/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';

@injectable()
class invalidateAllService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<void> {
    try {
      await this.cacheProvider.invalidateAll();
    } catch (error) {
      throw new AppError('Failed to invalidate shops');
    }
  }
}

export default invalidateAllService;
