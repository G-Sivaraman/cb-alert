import { REPORT_TYPES } from "./constants/egress-constants";
import { EmailData } from '@sendgrid/helpers/classes/email-address';

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
  isProfessionalService?: boolean;
  isSmbBusiness?: boolean;
  monthlyJobAllocation?: string;
  monthlyRevenueestimate?: string;
}
export interface CBSubscriptionJobsReportData extends CBReportDataBase {
  laggingJobs?: string;
  cpEndDate?: string;
  jobsPurchased?: string;
  jobsUsed?: string;
  isProfessionalService?: boolean;
  isSmbBusiness?: boolean;
  monthlyJobAllocation?: string;
  monthlyRevenueestimate?: string;
}

export type CBReportData = CBLaggingReportData | CBFlexReportData | CBSubscriptionJobsReportData;

//export const HC_TEMPLATE_FROM_ADDRESS: EmailData = { name: 'Mason Beard', email: 'mason.beard@careerbuilder.com' };
export const HC_TEMPLATE_FROM_ADDRESS: EmailData = { name: 'Lisa Liepold', email: 'lisa.liepold@careerbuilder.com' };
export const HC_TEMPLATE_SUBJECT_LAGGING = 'Lagging Job email';
export const HC_TEMPLATE_SUBJECT_FLEX = 'Lagging Job Email - Flex';
export const HC_TEMPLATE_SUBJECT_SUB = 'Lagging Job Email - Subscription';
export const HC_TEMPLATE_FLEX_PS_SUBJECT = 'Your client is running low on Flex jobs !';
export const HC_TEMPLATE_SUB_PS_SUBJECT = 'Your client is running low on Subscription jobs !';