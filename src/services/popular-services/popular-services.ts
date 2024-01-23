/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { IPopularList, IPopularUptade } from '@/models/populars';
import { ErrorCallBack, HttpUtil, IHTTPSParams } from '../config';

export interface IGetPopularResponse extends IGlobalResponse {
  datas: {
    datas: IPopularList[];
    totalDataCount: number;
  };
}

export class PopularService {
  private static instance: PopularService | null;

  private constructor() {}

  public static getInstance(): PopularService {
    if (!this.instance) {
      PopularService.instance = new PopularService();
    }
    return PopularService.instance!;
  }

  public async getPopular(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetPopularResponse> {
    const res = await HttpUtil.get('/Menu/activity', params, false, onError);
    return res;
  }

  public async changeExclusiveStatus(
    id: number,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(`/Menu/exclusive/${id}`, null, onError);
    return res;
  }

  public async changePopularMealStatus(
    id: number,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(`/Menu/popular-meal/${id}`, null, onError);
    return res;
  }

  public async changePopularMenuStatus(
    id: number,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(`/Menu/popular-menu/${id}`, null, onError);
    return res;
  }

  public async oldPriceUptade(
    body: IPopularUptade,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(`/Menu/old-price`, body, onError);
    return res;
  }

  public async oldPriceDelet(
    id: number,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.delete(`/Menu/old-price/${id}`, null, onError);
    return res;
  }
}
