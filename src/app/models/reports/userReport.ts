import {StatusUserReport} from "../filters/reports/userReportFilter";

export interface IUserReport {
  id?: number,
  authorId: number,
  userId: number,
  description: string,
  categoryReportId:number,
  createDate?: string
  statusCheck:StatusUserReport;
}
