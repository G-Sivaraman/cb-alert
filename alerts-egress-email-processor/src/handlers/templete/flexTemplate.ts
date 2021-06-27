import { CBFlexReportData } from "../../model/CBReportData";
import { getNewLine } from "../../model/EmailTemplate";

export const generateTableFlex = (targetData: CBFlexReportData[]): string => {
  return `<table class="table-wrap">
  <thead>
    <tr>
      <th>Account DID</th>
      <th>Customer Name</th>
      <th>Contract End date</th>
      <th>CP End date</th>
      <th>Jobs Purchased</th>
      <th>Jobs Used</th>
      <th>Lagging Jobs</th>
    </tr>
  </thead>
  <tbody>
  ${convertDataToListFlex(targetData, true)}
  </tbody>
</table>
`};

export const convertDataToListFlex = (data: CBFlexReportData[], html = false): string => {
  if (!html) {
    return data
      .map(item => `AccountDID: ${item.accountDID} ${getNewLine(1, html)}
Customer Name: ${item.customerName} ${getNewLine(1, html)}
Contract End date: ${item.contractEndDate} ${getNewLine(1, html)}
CP End date: ${item.cpEndDate} ${getNewLine(1, html)}
Jobs Purchased: ${item.jobsPurchased} ${getNewLine(1, html)}
Jobs Used: ${item.jobsUsed} ${getNewLine(1, html)}
Lagging Jobs: ${item.laggingJobs} ${getNewLine(1, html)}`
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
      <td>${item.laggingJobs}</td>
      </tr>
      `
      )
      .join(getNewLine(1, html));
  }

}

export const generateTableFlexPS = (targetData: CBFlexReportData[]): string => {
  return `<table class="table-wrap">
  <thead>
    <tr>
      <th>Account DID</th>
      <th>Customer Name</th>
      <th>Contract End date</th>
      <th>CP End date</th>
      <th>Monthly Job Allocation</th>
      <th>Monthly Revenue Estimate</th>
    </tr>
  </thead>
  <tbody>
  ${convertDataToListFlexPS(targetData, true)}
  </tbody>
</table>
`};

export const convertDataToListFlexPS = (data: CBFlexReportData[], html = false): string => {
  if (!html) {
    return data
      .map(item => `AccountDID: ${item.accountDID} ${getNewLine(1, html)}
Customer Name: ${item.customerName} ${getNewLine(1, html)}
Contract End date: ${item.contractEndDate} ${getNewLine(1, html)}
CP End date: ${item.cpEndDate} ${getNewLine(1, html)}
Monthly Job Allocation: ${item.monthlyJobAllocation} ${getNewLine(1, html)}
CMonthly Revenue Estimate: ${item.monthlyRevenueestimate} ${getNewLine(1, html)}`
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
      <td>${item.monthlyJobAllocation}</td>
      <td>${item.monthlyRevenueestimate}</td>
      </tr>
      `
      )
      .join(getNewLine(1, html));
  }

}