/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { IOrdersResponse } from '@/models/orders';
import { IContactResponse, IContactUpsert } from '@/views/contact/models';
import { ErrorCallBack, HttpUtil, } from '../config';

export interface IGetOrdersResponse extends IGlobalResponse {
    datas: {
        datas: IOrdersResponse[];
        totalDataCount: number;
    };
}

export class ContactServices {
    private static instance: ContactServices | null;

    private constructor() { }

    public static getInstance(): ContactServices {
        if (!this.instance) {
            ContactServices.instance = new ContactServices();
        }
        return ContactServices.instance!;
    }

    public async get(
        onError?: ErrorCallBack
    ): Promise<IContactResponse> {
        const res = await HttpUtil.get('/admin/settings/contact-details', null, false, onError);
        return res;
    }

    public async upsert(body: IContactUpsert, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/settings/contact-details', body, onError);
        return res;
    }
}
