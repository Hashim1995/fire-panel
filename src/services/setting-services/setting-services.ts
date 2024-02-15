/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { ILanguageItem } from '@/models/settings';
import { ErrorCallBack, HttpUtil } from '../config';

export interface IGetLanguagesResponse extends IGlobalResponse {
  datas: ILanguageItem[];
}

export interface IChangePrice {
  complexAmount: number,
  simpleAmount: number,
}

export interface IGetCurrentPrice extends IGlobalResponse {
  data:
  [
    {
      id: number,
      paymentType: number,
      amount: number
    },
    {
      id: 2,
      paymentType: number,
      amount: number
    }
  ]

}

export class SettingsService {
  private static instance: SettingsService | null;

  private constructor() { }

  public static getInstance(): SettingsService {
    if (!this.instance) {
      SettingsService.instance = new SettingsService();
    }
    return SettingsService.instance!;
  }

  public async getCurrentPrices(onError?: ErrorCallBack): Promise<IGetCurrentPrice> {
    const res = await HttpUtil.get(`/admin/settings/payment-type`, null, false, onError);
    return res;
  }

  public async changePrice(body: IChangePrice, onError?: ErrorCallBack): Promise<IGlobalResponse> {
    const res = await HttpUtil.put('/admin/settings/payment-type', body, onError);
    return res;
  }

}
