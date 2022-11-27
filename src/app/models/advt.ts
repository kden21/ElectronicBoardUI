export interface IAdvt {
  id: number;
  name: string,
  price: number,
  description?: string,
  photo?: string[],
  status: StatusAdvt,
  categoryId: number,
  authorId: number,
  location: string,
  createDate?: string

}

export enum StatusAdvt{
  Actual,
  Archive
}
