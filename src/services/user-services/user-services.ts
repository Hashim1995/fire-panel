/* eslint-disable no-empty-function */
/* eslint-disable no-useless-constructor */
/* eslint-disable class-methods-use-this */
import { IBranches, IUserItem, } from '@/models/users';
import { IGlobalResponse } from '@/models/common';
import { ErrorCallBack, HttpUtil, IHTTPSParams } from '../config';

export interface IGetUsersResponse extends IGlobalResponse {
  data: {
    data: IUserItem[];
    totalDataCount: number;
  };
}

export interface IGetBranchResponse extends IGlobalResponse {
  datas: IBranches[];
}

export class UsersServies {
  // eslint-disable-next-line no-use-before-define
  private static instance: UsersServies | null;

  private constructor() { }

  public static getInstance(): UsersServies {
    if (!this.instance) {
      UsersServies.instance = new UsersServies();
    }
    return UsersServies.instance!;
  }

  public async blockClient(
    id: string,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put(`/User/activation/${id}`, null, onError);
    return res;
  }

  public async getUsers(
    params: IHTTPSParams[],
    onError?: ErrorCallBack
  ): Promise<IGetUsersResponse> {
    const res = await HttpUtil.get('/admin/user/users', params, false, onError);
    return res;
  }

  public async getBranches(
    onError?: ErrorCallBack
  ): Promise<IGetBranchResponse> {
    const res = await HttpUtil.get(
      '/Organization/initial',
      null,
      false,
      onError
    );
    return res;
  }

  public async createUser(
    payload: IUserItem,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.post('/admin/user', payload, onError);
    return res;
  }

  public async updateUser(
    payload: IUserItem,
    onError?: ErrorCallBack
  ): Promise<IGlobalResponse> {
    const res = await HttpUtil.put('/admin/user', payload, onError);
    return res;
  }


}
