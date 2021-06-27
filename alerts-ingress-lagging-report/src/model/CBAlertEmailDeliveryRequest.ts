import { CBReportData } from './CBLaggingReportData';

export type TEMPLATE_TYPES = 'SMB' | 'PS';

export interface CBAlertEmailDeliveryRequest {
  targetAddress: string;
  targetName: string;
  targetData: CBReportData[];
  templateID: string;
  templateType: TEMPLATE_TYPES;
}