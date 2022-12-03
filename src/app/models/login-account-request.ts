import {StatusUser} from "./filters/userFilter";
import {StatusRole} from "./user";

export interface LoginAccountRequest{
  login: string,
  password: string,
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
  statusUser:StatusUser,
}
