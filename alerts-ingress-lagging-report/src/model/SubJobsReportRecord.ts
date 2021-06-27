
import { PROFESSIONAL_SERVICES_INDICATOR_VALUE, SMB_BUSINESS_INDICATOR } from "./FlexJobReportRecord";
import { BaseReportRecord, parseAsNumber, } from "./IngressBase";
import { REPORT_TYPES } from './constants/ingress-constants';

export interface SubscriptionJobReportRecord extends BaseReportRecord {
  CT_CURRENT_CHANNEL: string
  CT_CURRENT_SUB_REGION: string
  CUST_COMPANY_NAME: string
  CT_CURRENT_SALES_REP_NAME: string
  CUST_SUCCESS_REP_NAME: string
  CUST_SUCCESS_REP_ID: string
  CUST_SUCC_REP_EMAIL: string
  CUST_SUCCESS_REP_MANAGER_EMAIL: string
  CONTRACT_NUMBER: string
  CONTRACT_STARTDATE: string
  CP_END_DATE: string
  PRODUCTID_DESC: string
  CONTRACTDID: string
  JOBS_PURCHASED: string
  IDEAL_JOB_PACE: string
  JOBS_USED: string
  CLIENT_PACE_VS_IDEAL: string
  LAGGING_SUB_REVENUE: string
  LAGGING_FLAG?: boolean
  RUN_RATE_VS_CLIENT_PACE?: string
}

export const validateSourceRecord = (source: SubscriptionJobReportRecord): SubscriptionJobReportRecord => {
  const result = {
    ...source,
    LAGGING_FLAG: (source.CT_CURRENT_CHANNEL.toLowerCase() === PROFESSIONAL_SERVICES_INDICATOR_VALUE.toLowerCase() && +parseAsNumber(source.RUN_RATE_VS_CLIENT_PACE) > 80) ?
      true : (source.CT_CURRENT_CHANNEL.toLowerCase() === SMB_BUSINESS_INDICATOR.toLowerCase() && +parseAsNumber(source.RUN_RATE_VS_CLIENT_PACE) < 33),
    JOBS_PURCHASED: parseAsNumber(source.JOBS_PURCHASED),
    JOBS_USED: parseAsNumber(source.JOBS_USED),
    IS_PROFESSIONAL_SERVICE: source.CT_CURRENT_CHANNEL.toLowerCase() === PROFESSIONAL_SERVICES_INDICATOR_VALUE.toLowerCase(),
    IS_SMB_BUSINESS: source.CT_CURRENT_CHANNEL.toLowerCase() === SMB_BUSINESS_INDICATOR.toLowerCase(),
    CP_END_DATE: new Date(source.CP_END_DATE).toLocaleString().split(/\D/).slice(0, 3).map(num => num.padStart(2, "0")).join("/"),
    CONTRACT_END_DATE: new Date(source.CONTRACT_END_DATE).toLocaleString().split(/\D/).slice(0, 3).map(num => num.padStart(2, "0")).join("/"),
    TYPE: <REPORT_TYPES>'SUBSCRIPTION_JOBS'
  }
  console.log(result);
  return result;
};

export const isLagging = (record: SubscriptionJobReportRecord): boolean => record.LAGGING_FLAG;