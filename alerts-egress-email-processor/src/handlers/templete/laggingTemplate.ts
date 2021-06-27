import { CBAlertEmailDeliveryRequest } from "../../model/CBAlertEmailDeliveryRequest";
import { CBLaggingReportData } from "../../model/CBReportData";
import { getNewLine, mailHeader } from "../../model/EmailTemplate";

export const generateTableLagging = (targetData: CBLaggingReportData[]): string => `
<table class="table-wrap">
  <thead>
    <tr>
      <th>Account DID</th>
      <th>Customer Name</th>
      <th>Contract End date</th>
      <th>Product Family Desc</th>
      <th>Lagging Revenue</th>
    </tr>
  </thead>
  <tbody>
  ${convertDataToListLagging(targetData, true)}
  </tbody>
</table>
`;
export const convertDataToListLagging = (data: CBLaggingReportData[], html = false): string => {
  if (!html) {
    return data
      .map(item => `
      AccountDID: ${item.accountDID} ${getNewLine(1, html)}
      Customer Name: ${item.customerName} ${getNewLine(1, html)}
      PRD_Family_desc: ${item.prdFamilyDesc} ${getNewLine(1, html)}
      `
      )
      .join(getNewLine(1, html));
  } else {
    return data
      .map(item => `
      <tr>
      <td>${item.accountDID}</td>
      <td>${unescape(item.customerName.replace(/^"(.*)"$/, '$1'))}</td>
      <td>${item.contractEndDate}</td>
      <td>${item.prdFamilyDesc}</td>
      <td>$${item.laggingRevenue}</td>
      </tr>
      `
      )
      .join(getNewLine(1, html));
  }

}