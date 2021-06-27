import { REPORT_TYPES } from "./constants/ingress-constants";
export const parseAsNumber = (value) => value ? Number(value.replace(/[^0-9.]/g, '')).toFixed(2) : '0.00';
export interface BaseReportRecord {
  ACCOUNTDID: string
  CUST_SUCCESS_REP_NAME: string
  CT_CURRENT_SALESREP_NAME: string
  CUST_SUCCESS_MANGER_ID: string
  CONTRACT_END_DATE: string
  CUST_COMPANY_NAME: string
  CUST_SUCCESS_REPNAME: string
  CUST_SUCCESS_REPEMAIL: string
  MANAGER_NAME: string
  MANAGER_EMAIL: string
  TYPE: REPORT_TYPES
  IS_PROFESSIONAL_SERVICE?: boolean
  IS_SMB_BUSINESS?: boolean
}