import {StatusAdvtReport} from "../filters/reports/adReportFilter";

export interface IAdvtReport {
  id?: number,
  authorId: number,
  advtId: number,
  description: string,
  categoryReportId:number,
  createDate?: string
  statusCheck:StatusAdvtReport;
}
