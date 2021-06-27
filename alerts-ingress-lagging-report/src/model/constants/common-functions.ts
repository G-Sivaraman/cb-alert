import { CBAlertEmailDeliveryRequest } from "../CBAlertEmailDeliveryRequest";
import { CBReportData } from "../CBLaggingReportData";
import { FlexJobReportRecord } from "../FlexJobReportRecord";
import { LaggingReportRecord } from "../LaggingReportRecord";
import { SubscriptionJobReportRecord } from "../SubJobsReportRecord";
import { HC_FLEX_JOBS_TEMPLATE_ID, HC_LAGGING_TEMPLATE_ID, HC_SUBSCRIPTION_JOBS_TEMPLATE_ID, successEmail, successName } from "./ingress-constants";

export const bundleBySuccessRep =
  (acc: CBAlertEmailDeliveryRequest[], item: LaggingReportRecord | FlexJobReportRecord | SubscriptionJobReportRecord): CBAlertEmailDeliveryRequest[] => {
    const successRepEmail = successEmail(item);
    const successRepName = successName(item);
    const idx = acc.findIndex(i => i.targetAddress === successRepEmail);
    const itemAlreadyExists = (idx !== -1);
    const current: CBAlertEmailDeliveryRequest = itemAlreadyExists
      ? { ...acc[idx] }
      : {
        targetAddress: successRepEmail,
        targetName: successRepName,
        targetData: [],
        templateID: item.TYPE === 'LAGGING_JOBS' ? HC_LAGGING_TEMPLATE_ID : item.TYPE === 'FLEX_JOBS' ? HC_FLEX_JOBS_TEMPLATE_ID : HC_SUBSCRIPTION_JOBS_TEMPLATE_ID,
        templateType: item.IS_SMB_BUSINESS ? 'SMB' : item.IS_PROFESSIONAL_SERVICE ? 'PS' : 'SMB'
      }

    current.targetData.push(convertToAlertData(item));

    const copy = [...acc];

    if (itemAlreadyExists) {
      copy[idx] = current;
    } else {
      copy.push(current);
    }

    return [...copy];
  };

export const convertToAlertData = (record: LaggingReportRecord | FlexJobReportRecord | SubscriptionJobReportRecord): CBReportData => {
  let reportData = {
    accountDID: record.ACCOUNTDID,
    customerName: record.CUST_COMPANY_NAME.replace(/^"(.*)"$/, '$1'),
    contractEndDate: record.CONTRACT_END_DATE,
    type: record.TYPE
  } as CBReportData;
  if (record.TYPE === 'LAGGING_JOBS') {
    return {
      ...reportData,
      percentUsed: (record as LaggingReportRecord).PERCENTAGE_USED,
      percentIntoContract: (record as LaggingReportRecord).PERCENTAGE_INTO_CONTRACT,
      prdFamilyDesc: (record as LaggingReportRecord).PRD_FAMILY_DESC,
      laggingRevenue: (record as LaggingReportRecord).LAGGING_REVENUE
    }
  } else if (record.TYPE === 'FLEX_JOBS') {
    return {
      ...reportData,
      jobsPurchased: (record as FlexJobReportRecord).JOBS_PURCHASED,
      jobsUsed: (record as FlexJobReportRecord).JOBS_USED,
      cpEndDate: (record as FlexJobReportRecord).CP_END_DATE,
      laggingJobs: (record as FlexJobReportRecord).LAGGING_JOBS,
      isProfessionalService: (record as FlexJobReportRecord).IS_PROFESSIONAL_SERVICE,
      isSmbBusiness: (record as FlexJobReportRecord).IS_SMB_BUSINESS,
      monthlyJobAllocation: (record as FlexJobReportRecord).MONTHLY_JOB_ALLOCATION,
      monthlyRevenueestimate: (record as FlexJobReportRecord).MONTHLY_REVENUE_ESTIMATE,
    }
  } else if (record.TYPE === 'SUBSCRIPTION_JOBS') {
    return {
      ...reportData,
      jobsPurchased: (record as SubscriptionJobReportRecord).JOBS_PURCHASED,
      jobsUsed: (record as SubscriptionJobReportRecord).JOBS_USED,
      cpEndDate: (record as FlexJobReportRecord).CP_END_DATE,
      laggingJobs: (record as FlexJobReportRecord).LAGGING_JOBS,
      isProfessionalService: (record as FlexJobReportRecord).IS_PROFESSIONAL_SERVICE,
      isSmbBusiness: (record as FlexJobReportRecord).IS_SMB_BUSINESS,
    }
  }
};