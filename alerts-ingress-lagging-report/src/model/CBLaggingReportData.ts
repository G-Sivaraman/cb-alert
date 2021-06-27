import { REPORT_TYPES } from "./constants/ingress-constants";
export interface CBReportDataBase {
  accountDID: string;
  customerName: string;
  contractEndDate?: string;
  type: REPORT_TYPES
}
export interface CBLaggingReportData extends CBReportDataBase {
  percentUsed?: number;
  percentIntoContract?: number;
  prdFamilyDesc?: string;
  laggingRevenue?: number;
}
export interface CBFlexReportData extends CBReportDataBase {
  laggingJobs?: string;
  cpEndDate?: string;
  jobsPurchased?: string;
  jobsUsed?: string;
  isProfessionalService: boolean;
  isSmbBusiness: boolean;
  monthlyJobAllocation: string;
  monthlyRevenueestimate: string;
}
export interface CBSubscriptionJobsReportData extends CBReportDataBase {
  laggingJobs?: string;
  cpEndDate?: string;
  jobsPurchased?: string;
  jobsUsed?: string;
  isProfessionalService: boolean;
  isSmbBusiness: boolean;
  monthlyJobAllocation: string;
  monthlyRevenueestimate: string;
}

export type CBReportData = CBLaggingReportData | CBFlexReportData | CBSubscriptionJobsReportData;