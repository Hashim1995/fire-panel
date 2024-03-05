/* eslint-disable class-methods-use-this */

import { IAuth, IAuthLogin, IUser } from '@/models/user';
import { ErrorCallBack, HttpUtil } from '../config';

export interface IAuthResponse {
  message: string;
  succeeded: boolean;
  data: IUser;
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export class AuthService {


  public async getUserData(onError?: ErrorCallBack): Promise<IAuthResponse> {
    const res = await HttpUtil.get('/Auth/user-details', null, false, onError);
    return res;
  }

  public async login(
    body: IAuthLogin,
    onError?: ErrorCallBack
  ): Promise<IAuthResponse | null> {
    const res = await HttpUtil.post('/admin/auth/login', body, onError);
    return res;
  }

  public async changePassword(
    body: IChangePassword,
    onError?: ErrorCallBack
  ): Promise<IAuth> {
    const res = await HttpUtil.put('/Auth/ChangePassword', body, onError);
    return res;
  }
}
