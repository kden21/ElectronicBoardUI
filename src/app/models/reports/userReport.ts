export interface IUserReport {
  id?: number,
  authorId: number,
  userId: number,
  description: string,
  categoryReportId:number,
  createDate?: Date
}
