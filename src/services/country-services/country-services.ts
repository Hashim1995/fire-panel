/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { ICountryListResponse } from '@/views/country/models';
import { ErrorCallBack, HttpUtil, IHTTPSParams, } from '../config';


export class CountryServices {
    private static instance: CountryServices | null;

    private constructor() { }

    public static getInstance(): CountryServices {
        if (!this.instance) {
            CountryServices.instance = new CountryServices();
        }
        return CountryServices.instance!;
    }

    public async get(
        params: IHTTPSParams[],
        onError?: ErrorCallBack
    ): Promise<ICountryListResponse> {
        const res = await HttpUtil.get('/admin/country', params, false, onError);
        return res;
    }

    public async changeItemStatus(
        id: number,
        onError?: ErrorCallBack
    ): Promise<IGlobalResponse> {
        const res = await HttpUtil.put(
            `/admin/country/status/${id}`,
            null,
            onError
        );
        return res;
    }

    public async deleteItem(id: number, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.delete(`/admin/country/${id}`, null, onError);
        return res;
    }

    public async create(body: FormData, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/country', body, onError);
        return res;
    }

    public async update(body: FormData, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/country', body, onError);
        return res;
    }



}
