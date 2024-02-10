/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { IVisaApplicationListResponse } from '@/views/visa/models';
import { ErrorCallBack, HttpUtil, IHTTPSParams, } from '../config';


export class VisaServices {
    private static instance: VisaServices | null;

    private constructor() { }

    public static getInstance(): VisaServices {
        if (!this.instance) {
            VisaServices.instance = new VisaServices();
        }
        return VisaServices.instance!;
    }

    public async get(
        params: IHTTPSParams[],
        onError?: ErrorCallBack
    ): Promise<IVisaApplicationListResponse> {
        const res = await HttpUtil.get('/admin/Visa', params, false, onError);
        return res;
    }

    public async changeItemStatus(
        id: number,
        onError?: ErrorCallBack
    ): Promise<IGlobalResponse> {
        const res = await HttpUtil.put(
            `/admin/Visa/status/${id}`,
            null,
            onError
        );
        return res;
    }

    public async deleteItem(id: number, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.delete(`/admin/visa/required-documents/delete/${id}`, null, onError);
        return res;
    }

    public async askDocument(body: any, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/visa/required-documents/ask', body, onError);
        return res;
    }

    public async download(body: any, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/visa/required-documents/download', body, onError);
        return res;
    }

    public async update(body: FormData, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/country', body, onError);
        return res;
    }

    public async confirm(body: any, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/visa/required-documents/confirm', body, onError);
        return res;
    }



    public async takeDocument(onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/visa/appointment/take', null, onError);
        return res;
    }



}
