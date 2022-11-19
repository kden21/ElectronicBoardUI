export class AdvtFilter {
  userId?: number;
  categoryId?: number;
  location?: string;
  count?: number;
  description?: string;
  status: Status;
  lastAdvtId?: number|null
}

export enum Status {
  Actual,
  Archive,
  f
}
