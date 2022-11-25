import {StatusUser} from "./filters/userFilter";

export interface IUser{
  id?: number,
  name: string,
  middleName?: string,
  lastName: string,
  birthday: string,
  phoneNumber: string,
  role: StatusRole,
  photo: "",
  email: string,
  accountId?: number,
  token?: string,
  statusUser:StatusUser
}

export enum StatusRole {
  Admin,
  User,
  Anon
}

