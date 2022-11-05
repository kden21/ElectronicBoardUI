export interface IAdvt{
  id: number;
  name: string,
  price: number,
  description: string,
  photo: string,
  statusAdvt: number,
  categoryId: number,
  userId: number,
  createDate?: Date,
  location: string
}
