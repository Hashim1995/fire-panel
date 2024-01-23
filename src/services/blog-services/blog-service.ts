/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { IBlogListResponse } from '@/views/blog/models';
import { IContactUpsert } from '@/views/contact/models';
import { ErrorCallBack, HttpUtil, IHTTPSParams, } from '../config';


export class BlogServices {
    private static instance: BlogServices | null;

    private constructor() { }

    public static getInstance(): BlogServices {
        if (!this.instance) {
            BlogServices.instance = new BlogServices();
        }
        return BlogServices.instance!;
    }

    public async get(
        params: IHTTPSParams[],
        onError?: ErrorCallBack
    ): Promise<IBlogListResponse> {
        const res = await HttpUtil.get('/admin/blog', params, false, onError);
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


    public async upsert(body: IContactUpsert, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/settings/contact-details', body, onError);
        return res;
    }
}
