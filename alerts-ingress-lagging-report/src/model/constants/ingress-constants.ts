import { FlexJobReportRecord } from "../FlexJobReportRecord";
import { LaggingReportRecord } from "../LaggingReportRecord";
import { SubscriptionJobReportRecord } from "../SubJobsReportRecord";

export enum AlertDumpFileName {
  LAGGING_JOBS = 'LaggingUsageProductReportDataFeed.csv',
  FLEX_JOBS = 'FlexJobsUsageProductReportDataFeed.csv',
  SUBSCRIPTION_JOBS = 'SubscriptionJobsUsageProductReportDataFeed.csv'
}

export const HC_LAGGING_TEMPLATE_ID = 'POC_LAGGING';
export const HC_FLEX_JOBS_TEMPLATE_ID = 'FLEX_JOBS_LAGGING';
export const HC_SUBSCRIPTION_JOBS_TEMPLATE_ID = 'SUBSCRIPTION_JOBS_LAGGING';

export type REPORT_TYPES = 'LAGGING_JOBS' | 'FLEX_JOBS' | 'SUBSCRIPTION_JOBS'

export const successEmail = (record: LaggingReportRecord | FlexJobReportRecord | SubscriptionJobReportRecord): string =>
  record.CUST_SUCCESS_REPEMAIL;
export const successName = (record: LaggingReportRecord | FlexJobReportRecord | SubscriptionJobReportRecord): string =>
  record.CUST_SUCCESS_REP_NAME;