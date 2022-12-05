import {StatusUser} from "./filters/userFilter";

export interface IUser{
  id?: number,
  name: string,
  middleName?: string,
  lastName: string,
  birthday: string,
  phoneNumber: string,
  role: StatusRole,
  photo?: string|null,
  email: string,
  accountId?: number,
  token?: string,
  statusUser:StatusUser,
  createDate?:string
}

export enum StatusRole {
  Admin,
  User,
  Anon,
}

