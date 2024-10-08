
interface IUserItem {
  email: string,
  firstname: string,
  lastname: string,
  phoneNumber: string,
  role: any,
  id?: string
  isBlocked?: boolean,
  password?: string,
}
interface IUserChangePassword {
  password: string,
  id?: string,
}

interface IUserPayload {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  genderId: string | number | null;
  apiLogin: string;
  birthday: string | Date | null;
  roleId: string | number | null;
  branchId: string | number | null;
}

interface IBranches {
  readonly id: number;
  readonly name: string;
}

export type { IUserItem, IUserPayload, IBranches, IUserChangePassword };
