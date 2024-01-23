import { selectOption } from './common';

interface IUserItem {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  genderId: selectOption | null;
  apiLogin: string;
  birthday: string | Date | null;
  roleId: selectOption | null;
  branchId: selectOption | null;
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

export type { IUserItem, IUserPayload, IBranches };
