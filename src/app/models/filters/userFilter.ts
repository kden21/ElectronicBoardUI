export class UserFilter {
  status: StatusUser;
  advtFavoriteId?:number
}

export enum StatusUser {
  Actual,
  Archive,
  AwaitingEmailConfirm=3
}
