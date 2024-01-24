/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { IAppealListResponse } from '@/views/appeal/models';
import { IContactUpsert } from '@/views/contact/models';
import { ErrorCallBack, HttpUtil, IHTTPSParams, } from '../config';


export class AppealServices {
    private static instance: AppealServices | null;

    private constructor() { }

    public static getInstance(): AppealServices {
        if (!this.instance) {
            AppealServices.instance = new AppealServices();
        }
        return AppealServices.instance!;
    }

    public async get(
        params: IHTTPSParams[],
        onError?: ErrorCallBack
    ): Promise<IAppealListResponse> {
        const res = await HttpUtil.get('/admin/appeal', params, false, onError);
        return res;
    }

    public async changeItemStatus(
        id: number,
        onError?: ErrorCallBack
    ): Promise<IGlobalResponse> {
        const res = await HttpUtil.put(
            `/admin/blog/status/${id}`,
            null,
            onError
        );
        return res;
    }

    public async deleteItem(id: number, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.delete(`/admin/blog/${id}`, null, onError);
        return res;
    }

    public async create(body: FormData, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/blog', body, onError);
        return res;
    }

    public async update(body: FormData, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/blog', body, onError);
        return res;
    }


    public async upsert(body: IContactUpsert, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/settings/contact-details', body, onError);
        return res;
    }
}
