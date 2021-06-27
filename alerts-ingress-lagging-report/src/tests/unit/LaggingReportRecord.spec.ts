'use strict';

import {
  LaggingReportRecord,
  isLagging,
  LaggingReportRecordSource,
  validateSourceRecord,
  LAGGING_INDICATOR_VALUE
} from "../../model/LaggingReportRecord";
import { CBLaggingReportData } from "../../model/CBLaggingReportData";
import { CBAlertEmailDeliveryRequest } from "../../model/CBAlertEmailDeliveryRequest";
import { HC_LAGGING_TEMPLATE_ID, successEmail } from "src/model/constants/ingress-constants";
import { bundleBySuccessRep, convertToAlertData } from "src/model/constants/common-functions";

const chai = require('chai');
const expect = chai.expect;

describe('LaggingReportRecord', function () {
  describe('validateSourceRecord', () => {
    const source: LaggingReportRecordSource = {
      CURRENT_NCV: '1.1',
      EARN_REMAIN: '2.2',
      PERCENTAGE_USED: '3.3',
      PERCENTAGE_INTO_CONTRACT: '4.4',
      LAGGING_REVENUE: '5.5'
    } as LaggingReportRecordSource;

    it('true lagging', () => {
      const sourceLagging = { ...source, LAGGING_FLAG: LAGGING_INDICATOR_VALUE };

      const converted: LaggingReportRecord = validateSourceRecord(sourceLagging);

      expect(converted).to.deep.equal({
        LAGGING_FLAG: true,
        CURRENT_NCV: 1.1,
        EARN_REMAIN: 2.2,
        PERCENTAGE_USED: 3.3,
        PERCENTAGE_INTO_CONTRACT: 4.4,
        LAGGING_REVENUE: 5.5
      });
    });

    it('false lagging', () => {
      const sourceLagging = { ...source, LAGGING_FLAG: "NOT THAT" };

      const converted: LaggingReportRecord = validateSourceRecord(sourceLagging);

      expect(converted).to.deep.equal({
        LAGGING_FLAG: false,
        CURRENT_NCV: 1.1,
        EARN_REMAIN: 2.2,
        PERCENTAGE_USED: 3.3,
        PERCENTAGE_INTO_CONTRACT: 4.4,
        LAGGING_REVENUE: 5.5
      });
    });
  });

  it('highLaggingPecentage filters correctly', async () => {
    const high: LaggingReportRecord = {
      LAGGING_FLAG: true,
      PERCENTAGE_INTO_CONTRACT: 90,
      PERCENTAGE_USED: 31.848
    } as LaggingReportRecord;

    const high2: LaggingReportRecord = {
      LAGGING_FLAG: true,
      PERCENTAGE_INTO_CONTRACT: 90,
      PERCENTAGE_USED: 31.848
    } as LaggingReportRecord;

    const notHigh: LaggingReportRecord = {
      LAGGING_FLAG: false,
      PERCENTAGE_INTO_CONTRACT: 71.346,
      PERCENTAGE_USED: 61.848
    } as LaggingReportRecord;

    const records = [high, high2, notHigh];

    const result = records.filter(isLagging);

    expect(result).to.deep.equal([high, high2]);
  });

  it('mapLaggingRecordEmail gets correct email field', () => {
    const one: LaggingReportRecord = {
      CUST_SUCCESS_REPEMAIL: 'one@email.com'
    } as LaggingReportRecord;

    const two: LaggingReportRecord = {
      CUST_SUCCESS_REPEMAIL: 'two@email.com'
    } as LaggingReportRecord;

    const records = [one, two];

    const result = records.map(successEmail);

    expect(result).to.deep.equal([one.CUST_SUCCESS_REPEMAIL, two.CUST_SUCCESS_REPEMAIL]);
  });

  it('both work together', () => {
    const high: LaggingReportRecord = {
      LAGGING_FLAG: true,
      PERCENTAGE_INTO_CONTRACT: 90,
      PERCENTAGE_USED: 31.848,
      CUST_SUCCESS_REPEMAIL: 'high@email.com'
    } as LaggingReportRecord;

    const high2: LaggingReportRecord = {
      LAGGING_FLAG: true,
      PERCENTAGE_INTO_CONTRACT: 90,
      PERCENTAGE_USED: 31.848,
      CUST_SUCCESS_REPEMAIL: 'high2@email.com'
    } as LaggingReportRecord;

    const notHigh: LaggingReportRecord = {
      LAGGING_FLAG: false,
      PERCENTAGE_INTO_CONTRACT: 71.346,
      PERCENTAGE_USED: 61.848,
      CUST_SUCCESS_REPEMAIL: 'notHigh@email.com'
    } as LaggingReportRecord;

    const records = [high, high2, notHigh];

    const result = records
      .filter(isLagging)
      .map(successEmail);

    expect(result).to.deep.equal(['high@email.com', 'high2@email.com']);
  });

  describe('convertToAlertData', () => {
    it('works', () => {
      const item: LaggingReportRecord = {
        ACCOUNTDID: 'TESTACCTDID',
        PERCENTAGE_USED: 31.848,
        PERCENTAGE_INTO_CONTRACT: 5.1,
        CUST_COMPANY_NAME: 'COMPANY A',
        PRD_FAMILY_DESC: 'Test Data',
        LAGGING_REVENUE: 78,
        CONTRACT_END_DATE: '9/2/2012'
      } as LaggingReportRecord;

      const expected: CBLaggingReportData = {
        accountDID: item.ACCOUNTDID,
        customerName: item.CUST_COMPANY_NAME,
        percentUsed: Number(item.PERCENTAGE_USED),
        percentIntoContract: item.PERCENTAGE_INTO_CONTRACT,
        prdFamilyDesc: item.PRD_FAMILY_DESC,
        contractEndDate: item.CONTRACT_END_DATE,
        laggingRevenue: item.LAGGING_REVENUE,
        type: 'LAGGING_JOBS'
      };

      const converted = convertToAlertData(item);
      console.log(converted);
      console.log(expected);

      expect(converted).to.deep.equal(expected);
    });
  });

  describe('bundleBySuccessRep', () => {
    it('maps and reduces', () => {
      const repAItems: LaggingReportRecord[] = [
        {
          PERCENTAGE_USED: 31.848,
          CUST_COMPANY_NAME: 'A COMPANY THINGS',
          CUST_SUCCESS_REPEMAIL: 'repa@email.com',
          CUST_SUCCESS_REP_NAME: 'REP A'
        } as LaggingReportRecord,
        {
          PERCENTAGE_USED: 1.2,
          CUST_COMPANY_NAME: 'A DIFFERENT COMPANY THINGS',
          CUST_SUCCESS_REPEMAIL: 'repa@email.com',
          CUST_SUCCESS_REP_NAME: 'REP A'
        } as LaggingReportRecord
      ];
      const repBItems: LaggingReportRecord[] = [
        {
          PERCENTAGE_USED: 31.848,
          CUST_COMPANY_NAME: 'B COMPANY THINGS',
          CUST_SUCCESS_REPEMAIL: 'repb@email.com',
          CUST_SUCCESS_REP_NAME: 'REP B'
        } as LaggingReportRecord,
        {
          PERCENTAGE_USED: 1.2,
          CUST_COMPANY_NAME: 'B DIFFERENT COMPANY THINGS',
          CUST_SUCCESS_REPEMAIL: 'repb@email.com',
          CUST_SUCCESS_REP_NAME: 'REP B'
        } as LaggingReportRecord
      ];
      const repCItems: LaggingReportRecord[] = [
        {
          PERCENTAGE_USED: 31.848,
          CUST_COMPANY_NAME: 'C COMPANY THINGS',
          CUST_SUCCESS_REPEMAIL: 'repc@email.com',
          CUST_SUCCESS_REP_NAME: 'REP C'
        } as LaggingReportRecord,
        {
          PERCENTAGE_USED: 1.2,
          CUST_COMPANY_NAME: 'C DIFFERENT COMPANY THINGS',
          CUST_SUCCESS_REPEMAIL: 'repc@email.com',
          CUST_SUCCESS_REP_NAME: 'REP C'
        } as LaggingReportRecord
      ];

      const allRecords = [...repAItems, ...repBItems, ...repCItems];

      const aData: CBLaggingReportData[] = repAItems.map(convertToAlertData);
      const bData: CBLaggingReportData[] = repBItems.map(convertToAlertData);
      const cData: CBLaggingReportData[] = repCItems.map(convertToAlertData);

      const expected: CBAlertEmailDeliveryRequest[] = [
        {
          targetAddress: repAItems[0].CUST_SUCCESS_REPEMAIL,
          targetName: repAItems[0].CUST_SUCCESS_REP_NAME,
          targetData: aData,
          templateID: HC_LAGGING_TEMPLATE_ID,
          templateType: 'SMB'
        },
        {
          targetAddress: repBItems[0].CUST_SUCCESS_REPEMAIL,
          targetName: repBItems[0].CUST_SUCCESS_REP_NAME,
          targetData: bData,
          templateID: HC_LAGGING_TEMPLATE_ID,
          templateType: 'SMB'
        },
        {
          targetAddress: repCItems[0].CUST_SUCCESS_REPEMAIL,
          targetName: repCItems[0].CUST_SUCCESS_REP_NAME,
          targetData: cData,
          templateID: HC_LAGGING_TEMPLATE_ID,
          templateType: 'SMB'
        }
      ];

      const batched = allRecords.reduce(bundleBySuccessRep, []);

      expect(batched).to.deep.equal(expected);
    });
  });
});
