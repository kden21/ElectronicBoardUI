export class AdvtFilter {
  userId?: number;
  categoryId?: number;
  location?: string;
  count?: number;
  description?: string | null;
  status: Status;
  lastAdvtId?: number|null;
  isExistPhoto?:boolean;
  userVoter?:number;
}

export enum Status {
  Actual,
  Archive,
}
