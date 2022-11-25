export class AdvtFilter {
  userId?: number;
  categoryId?: number;
  location?: string;
  count?: number;
  description?: string;
  status: Status;
  lastAdvtId?: number|null;
  isExistPhoto?:boolean;
}

export enum Status {
  Actual,
  Archive,
  f
}
