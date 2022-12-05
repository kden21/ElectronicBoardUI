export interface IUserReview {
  id?: number,
  authorId: number,
  userId: number,
  description: string,
  rating:number,
  createDate?: string
}
