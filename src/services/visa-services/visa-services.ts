/* eslint-disable no-empty-function */
/* eslint-disable no-use-before-define */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IGlobalResponse } from '@/models/common';
import { IGetVisaLevelsResposne, IVisaApplicationListResponse } from '@/views/visa/models';
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
        const res = await HttpUtil.get('/admin/Visa/operator', params, false, onError);
        return res;
    }

    public async getVisaLevels(
        onError?: ErrorCallBack
    ): Promise<IGetVisaLevelsResposne> {
        const res = await HttpUtil.get('/admin/Visa/visa-levels', null, false, onError);
        return res;
    }

    public async getAdmin(
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

    public async cancelApply(visaAppointmendId: number, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put(`/admin/visa/cancel/${visaAppointmendId}`, null, onError);
        return res;
    }

    public async askDocument(body: any, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.post('/admin/visa/required-documents/ask', body, onError);
        return res;
    }

    public async reviewDocumentS(body: any, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/visa/required-documents/return', body, onError);
        return res;
    }

    public async download(url: any, onError?: ErrorCallBack): Promise<any> {
        const res = await HttpUtil.get(`/admin/visa/required-documents/download/${url}`, null, true, onError);
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

    public async makeAppointment(body: any, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/visa/reservation', null, onError, body);
        return res;
    }

    public async addExpense(body: any, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/visa/appointment/expense', body, onError);
        return res;
    }


    public async refund(body: any, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put('/admin/visa/appointment/refund', body, onError);
        return res;
    }

    public async approve(id: number, onError?: ErrorCallBack): Promise<IGlobalResponse> {
        const res = await HttpUtil.put(`/admin/visa/approve/${id}`, null, onError);
        return res;
    }

}
