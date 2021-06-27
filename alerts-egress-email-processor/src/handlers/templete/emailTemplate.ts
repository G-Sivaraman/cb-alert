import { CBAlertEmailDeliveryRequest } from "src/model/CBAlertEmailDeliveryRequest";
import { MailData, } from '@sendgrid/helpers/classes/mail';
import { HC_TEMPLATE_FLEX_PS_SUBJECT, HC_TEMPLATE_FROM_ADDRESS, HC_TEMPLATE_SUBJECT_FLEX, HC_TEMPLATE_SUBJECT_LAGGING, HC_TEMPLATE_SUBJECT_SUB, HC_TEMPLATE_SUB_PS_SUBJECT } from "src/model/CBReportData";
import { HC_FLEX_JOBS_TEMPLATE_ID, HC_LAGGING_TEMPLATE_ID, HC_SUBSCRIPTION_JOBS_TEMPLATE_ID } from "src/model/constants/egress-constants";
import { getNewLine, mailHeader } from "src/model/EmailTemplate";
import { convertDataToListLagging, generateTableLagging } from "./laggingTemplate";
import { convertDataToListFlex, convertDataToListFlexPS, generateTableFlex, generateTableFlexPS } from "./flexTemplate";
import { convertDataToListSub, convertDataToListSubPS, generateTableSub, generateTableSubPS } from "./subTemplate";


export const generateMailRequest = (request: CBAlertEmailDeliveryRequest): MailData => ({
  to: { name: 'Vikash Ruhil', email: 'vikash.ruhil@careerbuilder.com' },
  //to: { email: request.targetAddress, name: request.targetName },
  // bcc: [{ name: 'Jilna NT', email: 'jilna.nt@careerbuilder.com' },
  // { name: 'Mason Beard', email: 'mason.beard@careerbuilder.com' },
  // { name: 'Varsha Gumastha', email: 'Varsha.Gumastha@careerbuilder.com' }],
  from: HC_TEMPLATE_FROM_ADDRESS,
  subject: generateRequestSubject(request),
  text: generateRequestBodyText(request),
  html: generateRequestBodyHTML(request)
})

const generateRequestSubject = (request: CBAlertEmailDeliveryRequest) => {
  if (request.templateType === 'PS') {
    if (request.templateID === HC_FLEX_JOBS_TEMPLATE_ID) {
      return HC_TEMPLATE_FLEX_PS_SUBJECT
    } else {
      return HC_TEMPLATE_SUB_PS_SUBJECT;
    }
  } else {
    if (request.templateID === HC_LAGGING_TEMPLATE_ID) {
      return HC_TEMPLATE_SUBJECT_LAGGING;
    } else if (request.templateID === HC_FLEX_JOBS_TEMPLATE_ID) {
      return HC_TEMPLATE_SUBJECT_FLEX
    } else {
      return HC_TEMPLATE_SUBJECT_SUB;
    }
  }
}

const generateRequestBodyText = (request: CBAlertEmailDeliveryRequest): string => {
  if (request.templateType === 'SMB') {
    return `Dear ${request.targetName}, ${getNewLine(2)}
Below is the list of your SMB clients  for your review. Please review the list below for your next steps.${getNewLine(2)}
${convertDataToListSMB(request)}
    `;
  } else {
    return `Your client ${request.targetName} is running low on jobs. Please review their job usage and contact the client to determine if additional product is needed.${getNewLine(2)}
Data in table in email will be as below ${getNewLine(2)}
${convertDataToListPS(request)}`;
  }
}

const generateRequestBodyHTML = (request: CBAlertEmailDeliveryRequest): string => {
  if (request.templateType === 'SMB') {
    return `${mailHeader}
    <body>
      Dear ${request.targetName}, ${getNewLine(2, true)}
      Below is the list of your SMB clients  for your review. Please review the list below for your next steps.${getNewLine(2, true)}
      ${generateTableSMB(request)}
    </body>`;
  } else {
    return `${mailHeader}
    <body>
      Your client ${request.targetName} is running low on jobs. Please review their job usage and contact the client to determine if additional product is needed.${getNewLine(2, true)}
      Data in table in email will be as below 
      ${generateTablePS(request)}
    </body>`;
  }
}

const generateTableSMB = (request: CBAlertEmailDeliveryRequest): string => {
  if (request.templateID === HC_LAGGING_TEMPLATE_ID) {
    return generateTableLagging(request.targetData);
  } else if (request.templateID === HC_FLEX_JOBS_TEMPLATE_ID) {
    return generateTableFlex(request.targetData)
  } else if (request.templateID === HC_SUBSCRIPTION_JOBS_TEMPLATE_ID) {
    return generateTableSub(request.targetData)
  }
}

const convertDataToListSMB = (request: CBAlertEmailDeliveryRequest): string => {
  if (request.templateID === HC_LAGGING_TEMPLATE_ID) {
    return convertDataToListLagging(request.targetData);
  } else if (request.templateID === HC_FLEX_JOBS_TEMPLATE_ID) {
    return convertDataToListFlex(request.targetData)
  } else if (request.templateID === HC_SUBSCRIPTION_JOBS_TEMPLATE_ID) {
    return convertDataToListSub(request.targetData)
  }
}

const generateTablePS = (request: CBAlertEmailDeliveryRequest): string => {
  if (request.templateID === HC_FLEX_JOBS_TEMPLATE_ID) {
    return generateTableFlexPS(request.targetData)
  } else if (request.templateID === HC_SUBSCRIPTION_JOBS_TEMPLATE_ID) {
    return generateTableSubPS(request.targetData)
  }
}

const convertDataToListPS = (request: CBAlertEmailDeliveryRequest): string => {
  if (request.templateID === HC_FLEX_JOBS_TEMPLATE_ID) {
    return convertDataToListFlexPS(request.targetData)
  } else if (request.templateID === HC_SUBSCRIPTION_JOBS_TEMPLATE_ID) {
    return convertDataToListSubPS(request.targetData)
  }
}
