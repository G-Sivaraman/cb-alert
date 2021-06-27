import { CBReportData } from "./CBReportData";

export interface CBAlertEmailDeliveryRequest {
  targetAddress: string;
  targetName: string;
  templateID: string;
  targetData: CBReportData[];
  templateType: TEMPLATE_TYPES;
}

export type TEMPLATE_TYPES = 'SMB' | 'PS';