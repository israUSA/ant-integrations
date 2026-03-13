/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Inject,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getOwnerInfo(placa: string): Promise<any> {
    const cacheKey = `owner:${placa}`;
    const cached = await this.cacheManager.get<any>(cacheKey);
    if (cached) return { data: cached };

    try {
      const url = 'https://app3902.privynote.net/api/v1/transit/vehicle-owner';
      const response: AxiosResponse<any> = await firstValueFrom(
        this.httpService.get<any>(url, { data: { placa } }),
      );

      const { data } = response;
      await this.cacheManager.set(cacheKey, data.data, 3600000);
      return data;
    } catch (error) {
      throw new NotFoundException({
        error: 1,
        message: 'No se ha encontrado el vehículo con la placa ingresada.',
      });
    }
  }
}
