/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { ILanguageItem } from '@/models/settings';
import { ErrorCallBack, HttpUtil, IHTTPSParams } from '../config';

export interface IGetLanguagesResponse extends IGlobalResponse {
  datas: ILanguageItem[];
}

export class SettingsService {
  private static instance: SettingsService | null;

  private constructor() {}

  public static getInstance(): SettingsService {
    if (!this.instance) {
      SettingsService.instance = new SettingsService();
    }
    return SettingsService.instance!;
  }

  public async getLanguages(
    params?: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetLanguagesResponse> {
    const res = await HttpUtil.get('/language', params || null, false, onError);
    return res;
  }

  public async changeLanguageItemStatus(
    id: number,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(`/language/activation/${id}`, null, onError);
    return res;
  }
}
