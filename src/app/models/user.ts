import {StatusUser} from "./filters/userFilter";

export interface IUser{
  id: number,
  name: string,
  middleName?: string,
  lastName: string,
  birthday: Date,
  phoneNumber: string,
  role: StatusRole,
  photo: "",
  email: string,
  accountId: number,
  token?: string,
  statusCheck:StatusUser
}

export enum StatusRole {
  Admin,
  User,
  Anon
}

