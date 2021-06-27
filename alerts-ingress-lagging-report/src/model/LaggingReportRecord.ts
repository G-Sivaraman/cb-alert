import { BaseReportRecord } from "./IngressBase";

export interface LaggingReportRecordSource extends BaseReportRecord {
  CONTRACT_NUMBER: string
  CT_CURRENT_SUBREGION: string
  SUB_PRODUCT_LINE: string
  PRD_FAMILY_DESC: string
  LAGGING_FLAG: string,
  COMPANYCODE_DESC: string,
  CUST_SALESREP_ID: string,
  SALES_REP_NAME: string,
  SALES_REP_EMAIL: string,
  CONTRACT_STARTDATE: string,
  CONTRACTDID: string,
  CURRENT_NCV: string,
  EARN_REMAIN: string,
  PERCENTAGE_USED: string,
  PERCENTAGE_INTO_CONTRACT: string,
  LAGGING_REVENUE: string,
}

export interface LaggingReportRecord extends BaseReportRecord {
  CONTRACT_NUMBER: string
  CT_CURRENT_SUBREGION: string
  SUB_PRODUCT_LINE: string
  PRD_FAMILY_DESC: string
  LAGGING_FLAG: boolean,
  COMPANYCODE_DESC: string,
  CUST_SALESREP_ID: string,
  SALES_REP_NAME: string,
  SALES_REP_EMAIL: string,
  CONTRACT_STARTDATE: string,
  CONTRACTDID: string,
  CURRENT_NCV: number,
  EARN_REMAIN: number,
  PERCENTAGE_USED: number,
  PERCENTAGE_INTO_CONTRACT: number,
  LAGGING_REVENUE: number
}

export const LAGGING_INDICATOR_VALUE = 'LAGGING';
export const validateSourceRecord = (source: LaggingReportRecordSource): LaggingReportRecord => ({
  // probably want some actual field validations //
  ...source,
  LAGGING_FLAG: source.LAGGING_FLAG === LAGGING_INDICATOR_VALUE,
  CURRENT_NCV: Number(source.CURRENT_NCV),
  EARN_REMAIN: Number(source.EARN_REMAIN),
  PERCENTAGE_USED: Number(source.PERCENTAGE_USED),
  PERCENTAGE_INTO_CONTRACT: Number(source.PERCENTAGE_INTO_CONTRACT),
  LAGGING_REVENUE: Number(source.LAGGING_REVENUE),
  TYPE: 'LAGGING_JOBS',
})

export const POC_LAGGING_PERCENTAGE = 35;
export const isLagging = (record: LaggingReportRecord): boolean => record.LAGGING_FLAG;


