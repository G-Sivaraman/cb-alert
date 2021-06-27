import { CBSubscriptionJobsReportData } from "../../model/CBReportData";
import { getNewLine } from "../../model/EmailTemplate";

export const generateTableSub = (targetData: CBSubscriptionJobsReportData[]): string => {
  return `<table class="table-wrap">
  <thead>
    <tr>
      <th>Account DID</th>
      <th>Customer Name</th>
      <th>Contract End date</th>
      <th>CP End date</th>
      <th>Jobs Purchased</th>
      <th>Jobs Used</th>
    </tr>
  </thead>
  <tbody>
  ${convertDataToListSub(targetData, true)}
  </tbody>
</table>
`};

export const convertDataToListSub = (data: CBSubscriptionJobsReportData[], html = false): string => {
  if (!html) {
    return data
      .map(item => `AccountDID: ${item.accountDID} ${getNewLine(1, html)}
Customer Name: ${item.customerName} ${getNewLine(1, html)}
Contract End date: ${item.contractEndDate} ${getNewLine(1, html)}
CP End date: ${item.cpEndDate} ${getNewLine(1, html)}
Jobs Purchased: ${item.jobsPurchased} ${getNewLine(1, html)}
Jobs Used: ${item.jobsUsed} ${getNewLine(1, html)}`
      )
      .join(getNewLine(1, html));
  } else {
    return data
      .map(item => `
      <tr>
      <td>${item.accountDID}</td>
      <td>${unescape(item.customerName.replace(/^"(.*)"$/, '$1'))}</td>
      <td>${item.contractEndDate}</td>
      <td>${item.cpEndDate}</td>
      <td>${item.jobsPurchased}</td>
      <td>${item.jobsUsed}</td>
      </tr>
      `)
      .join(getNewLine(1, html));
  }

}

export const generateTableSubPS = (targetData: CBSubscriptionJobsReportData[]): string => `
<table class="table-wrap">
  <thead>
    <tr>
      <th>Account DID</th>
      <th>Customer Name</th>
      <th>Contract End date</th>
      <th>CP End date</th>
      <th>Job purchased</th>
      <th>Jobs used</th>
    </tr>
  </thead>
  <tbody>
  ${convertDataToListSubPS(targetData, true)}
  </tbody>
</table>
`;
export const convertDataToListSubPS = (data: CBSubscriptionJobsReportData[], html = false): string => {
  if (!html) {
    return data
      .map(item => `AccountDID: ${item.accountDID} ${getNewLine(1, html)}
Customer Name: ${item.customerName} ${getNewLine(1, html)}
Contract End date: ${item.contractEndDate} ${getNewLine(1, html)}
CP End date: ${item.cpEndDate} ${getNewLine(1, html)}
Job purchased: ${item.jobsPurchased} ${getNewLine(1, html)}
Jobs used: ${item.jobsUsed} ${getNewLine(1, html)}`)
      .join(getNewLine(1, html));
  } else {
    return data
      .map(item => `
      <tr>
      <td>${item.accountDID}</td>
      <td>${unescape(item.customerName.replace(/^"(.*)"$/, '$1'))}</td>
      <td>${item.contractEndDate}</td>
      <td>${item.cpEndDate}</td>
      <td>${item.jobsPurchased}</td>
      <td>${item.jobsUsed}</td>
      </tr>
      `)
      .join(getNewLine(1, html));
  }

}