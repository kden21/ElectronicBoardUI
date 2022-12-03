export class MessageNotification{
  constructor(type:TypeNotification, message:string) {
    this.type=type;
    this.message=message;
  }
  type:TypeNotification;
  message:string;
}
export enum TypeNotification{
  Error,
  Success
}
