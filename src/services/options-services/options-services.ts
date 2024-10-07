/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { IOptionCreate, IOptionListResponse, IOptionUpdate } from '@/views/options/models';
import { ErrorCallBack, HttpUtil, IHTTPSParams, } from '../config';


export class OptionsServices {
    private static instance: OptionsServices | null;

    private constructor() { }

    public static getInstance(): OptionsServices {
        if (!this.instance) {
            OptionsServices.instance = new OptionsServices();
        }
        return OptionsServices.instance!;
    }

    public async get(
        params: IHTTPSParams[],
        onError?: ErrorCallBack
    ): Promise<IOptionListResponse> {
        const res = await HttpUtil.get('/admin/settings/extra-option', params, false, onError);
        return res;
    }

    public async changeItemStatus(
        id: number,
        onError?: ErrorCallBack
    ): Promise<IGlobalResponse> {
        const res = await HttpUtil.put(
            `/admin/settings/extra-option/status/${id}`,
            null,
            onError
        );
        return res;
    }

    public async deleteItem(id: number, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.delete(`/admin/settings/extra-option/${id}`, null, onError);
        return res;
    }

    public async create(body: IOptionCreate, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/settings/extra-option', body, onError);
        return res;
    }

    public async update(body: IOptionUpdate, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/settings/extra-option', body, onError);
        return res;
    }



}
