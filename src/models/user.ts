export interface IAuthLogin {
  email: string;
  password: string;
}

type Actions = {
  [key: string]: boolean;
};

type Routes = {
  [key: string]: boolean;
};

export interface IAuth {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  gender: number | null;
  phoneNumber: string;
  email: string;
  birthday: null | string;
  token: null | string;
  apiLogin: null | string;
  role: string;
  isBlocked: boolean;
  permissions: {
    actions: Actions;
    routes: Routes;
  };
}

export interface ISelectorAuth {
  user?: IAuth;
}

export interface IUser {
  id: string
  firstname: string
  lastname: string
  username: string
  email: string
  birthday: string
  token: string
  role: string
}