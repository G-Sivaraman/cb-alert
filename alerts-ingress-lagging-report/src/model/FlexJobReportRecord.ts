import { BaseReportRecord, parseAsNumber } from "./IngressBase";

export interface FlexJobReportRecord extends BaseReportRecord {
  CT_CURRENT_CHANNEL: string
  CT_CURRENT_SUB_REGION: string
  CUST_COMPANY_NAME: string
  CUST_SUCCESS_REP_ID: string
  CONTRACT_NUMBER: string
  CP_END_DATE: string
  PRODUCTID_DESC: string
  CONTRACT_STARTDATE: string
  CONTRACTDID: string
  JOB_RUN_RATE: string
  JOBS_USED: string
  LAGGING_JOBS: string
  MONTHLY_JOB_ALLOCATION: string
  JOBS_PURCHASED: string
  MONTHLY_REVENUE_ESTIMATE: string
  MONTHS_BEHIND: string
  RUN_RATE_VS_CLIENT_PACE?: string
  FLEX_PRICE_PER_JOB: string
  FLEX_LAGGING_REVENUE: string
  LAGGING_FLAG?: boolean
}
// export const filterByCurrentChannel = (source: FlexJobReportSource[],filterKey: string): FlexJobReportRecord[] => {

// }
export const PROFESSIONAL_SERVICES_INDICATOR_VALUE = 'Professional Services';
export const SMB_BUSINESS_INDICATOR = 'Small Business';
export const isLagging = (record: FlexJobReportRecord): boolean => record.LAGGING_FLAG;
export const validateSourceRecord = (source: FlexJobReportRecord): FlexJobReportRecord => ({
  ...source,
  IS_PROFESSIONAL_SERVICE: source.CT_CURRENT_CHANNEL.toLowerCase() === PROFESSIONAL_SERVICES_INDICATOR_VALUE.toLowerCase(),
  IS_SMB_BUSINESS: source.CT_CURRENT_CHANNEL.toLowerCase() === SMB_BUSINESS_INDICATOR.toLowerCase(),
  LAGGING_JOBS: parseAsNumber(source.LAGGING_JOBS),
  JOBS_USED: parseAsNumber(source.JOBS_USED),
  JOBS_PURCHASED: parseAsNumber(source.JOBS_PURCHASED),
  CP_END_DATE: new Date(source.CP_END_DATE).toLocaleString().split(/\D/).slice(0, 3).map(num => num.padStart(2, "0")).join("/"),
  CONTRACT_END_DATE: new Date(source.CONTRACT_END_DATE).toLocaleString().split(/\D/).slice(0, 3).map(num => num.padStart(2, "0")).join("/"),
  MONTHLY_JOB_ALLOCATION: parseAsNumber(source.MONTHLY_JOB_ALLOCATION),
  MONTHLY_REVENUE_ESTIMATE: '$' + parseAsNumber(source.MONTHLY_REVENUE_ESTIMATE),
  TYPE: 'FLEX_JOBS',
  LAGGING_FLAG: (source.CT_CURRENT_CHANNEL.toLowerCase() === PROFESSIONAL_SERVICES_INDICATOR_VALUE.toLowerCase() && +parseAsNumber(source.RUN_RATE_VS_CLIENT_PACE) > 80) ?
    true : (source.CT_CURRENT_CHANNEL.toLowerCase() === SMB_BUSINESS_INDICATOR.toLowerCase() && +parseAsNumber(source.RUN_RATE_VS_CLIENT_PACE) < 33)
});

export const isProfessionServices = (record: FlexJobReportRecord): boolean => record.IS_PROFESSIONAL_SERVICE;

export const isSMBService = (record: FlexJobReportRecord): boolean => record.IS_SMB_BUSINESS;