export interface IAdvt {
  id: number;
  name: string,
  price: number,
  description?: string,
  photo?: string,
  status: number,
  categoryId: number,
  userId: number,
  location: string,
  createDate?: string

}
