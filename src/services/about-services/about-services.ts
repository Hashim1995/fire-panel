/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { IOrdersResponse } from '@/models/orders';
import { IAboutResponse } from '@/views/about/models';
import { ErrorCallBack, HttpUtil, } from '../config';

export interface IGetOrdersResponse extends IGlobalResponse {
    datas: {
        datas: IOrdersResponse[];
        totalDataCount: number;
    };
}

export class AboutSerices {
    private static instance: AboutSerices | null;

    private constructor() { }

    public static getInstance(): AboutSerices {
        if (!this.instance) {
            AboutSerices.instance = new AboutSerices();
        }
        return AboutSerices.instance!;
    }

    public async get(
        onError?: ErrorCallBack
    ): Promise<IAboutResponse> {
        const res = await HttpUtil.get('/admin/about/contents/all', null, false, onError);
        return res;
    }

    public async upsert(body: FormData, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/about/contents', body, onError);
        return res;
    }
}
