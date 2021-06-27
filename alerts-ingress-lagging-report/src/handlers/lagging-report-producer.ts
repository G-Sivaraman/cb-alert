import * as AWS from 'aws-sdk'; // for type defs, not sure how to do both here
import { CBAlertEmailDeliveryRequest } from '../model/CBAlertEmailDeliveryRequest';
import { bundleBySuccessRep } from '../model/constants/common-functions';
import * as subscriptionJobRecord from "../model//SubJobsReportRecord";
import * as flexJobRecord from "../model/FlexJobReportRecord";
import * as laggingRecord from "../model/LaggingReportRecord";
import * as fs from 'fs';

const s3 = new AWS.S3();

const csv = require('csv-parser')
const parse = require('csv-parse/lib/sync')

AWS.config.apiVersions = {
  sqs: '2012-11-05',
};

const sqs = new AWS.SQS();

exports.handler = async (event, context) => {


  const data = fs.readFileSync('./file/sub.csv', 'ascii')
  //console.log(data,'reached hello 2');
  const abc = parseDataFile(data, 'SubJobsUsageReportDataFeed.csv');
  console.log('jhxcj kdjchdjkvbjhfvkjkjbdfjk');
  console.log(abc);
  console.log(abc[0].targetData);

  //parseDataFile();
  /* let s3Params = { Bucket: '', Key: '' };
  let data: AWS.S3.GetObjectOutput;
  try {
    s3Params = getFileParamsFromEvent(event);
    console.log('params: ', s3Params);
    data = await s3.getObject(s3Params).promise();;
  } catch (e) {
    console.error('ERROR GETTING FILE DATA:', e);

    return null;
  }

  const deliveries: CBAlertEmailDeliveryRequest[] = parseDataFile(data, s3Params.Key);

  console.log(deliveries);

  for (let delivery of deliveries) {
    try {
      const sqsSuccessMessage: AWS.SQS.Types.SendMessageRequest = {
        MessageBody: JSON.stringify([delivery]), // receiver expects arrary of requests...
        QueueUrl: 'https://sqs.us-east-1.amazonaws.com/085769750161/alerts_email_queue'
      };

      await sqs.sendMessage(sqsSuccessMessage).promise();
      console.log('MESSAGE SENT!?: ', sqsSuccessMessage);
    }
    catch (e) {
      // need to handle individual failures - maybe push error somewhere?  DLQ?
      console.log('MESSAGE ERROR: ', e);
    };
  }; */
}

const getFileParamsFromEvent = (event): { Bucket: string, Key: string } => {
  const srcBucket = event.Records[0].s3.bucket.name;
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

  return {
    Bucket: srcBucket,
    Key: srcKey
  };
}

//const parseDataFile = (data: AWS.S3.GetObjectOutput, key: string): CBAlertEmailDeliveryRequest[] => {
const parseDataFile = (data: any, key: string): CBAlertEmailDeliveryRequest[] => {



  const dataString = data.toString('ascii');



  const fileName = key;
  if (fileName === 'LaggingUsageProductReportDataFeed.csv') {
    const laggingJobRecords = processLaggingReportRecords(dataString);
    return laggingJobRecords
      .filter(laggingRecord.isLagging)
      .reduce(bundleBySuccessRep, []);
  } else if (fileName === 'FlexUsageReportDataFeed.csv') {
    const flexJobRecords = processFlexJobReportRecords(dataString);
    return flexJobRecords
      .filter(flexJobRecord.isLagging)
      .reduce(bundleBySuccessRep, []);
  } else if (fileName === 'SubJobsUsageReportDataFeed.csv') {
    const subJobRecords = processSubscriptionJobReportRecords(dataString);
    return subJobRecords
      .filter(subscriptionJobRecord.isLagging)
      .reduce(bundleBySuccessRep, []);
  }
}

const processLaggingReportRecords = (dataString: string): laggingRecord.LaggingReportRecord[] => {
  const sourceRecords: laggingRecord.LaggingReportRecordSource[] = parse(dataString, {
    columns: true,
    skip_empty_lines: true
  })

  //console.log('records?: ', sourceRecords);
  //console.log('records?: ', sourceRecords.length + 1);
  //console.log('records?: ', sourceRecords[1]);

  const records = sourceRecords.map(laggingRecord.validateSourceRecord);
  //console.log('post validate records?: ', records);

  return records;
}

export const processFlexJobReportRecords = (dataString: string): flexJobRecord.FlexJobReportRecord[] => {
  const sourceRecords: flexJobRecord.FlexJobReportRecord[] = parse(dataString, {
    columns: true,
    skip_empty_lines: true
  })

  //console.log('records?: ', sourceRecords);
  //console.log('records?: ', sourceRecords.length + 1);
  //console.log('records?: ', sourceRecords[1]);

  const records = sourceRecords.map(flexJobRecord.validateSourceRecord);
  //console.log('post validate Flex Job Report records?: ', records);

  return records;
}

export const processSubscriptionJobReportRecords = (dataString: string): subscriptionJobRecord.SubscriptionJobReportRecord[] => {
  const sourceRecords: subscriptionJobRecord.SubscriptionJobReportRecord[] = parse(dataString, {
    columns: true,
    skip_empty_lines: true
  })

  //console.log('records?: ', sourceRecords);
  //console.log('records?: ', sourceRecords.length + 1);
  //console.log('records?: ', sourceRecords[1]);

  const records = sourceRecords.map(subscriptionJobRecord.validateSourceRecord);
  //console.log('post validate Flex Job Report records?: ', records);

  return records;
}

const getFileName = (path: string): string => {
  const separator = '/';
  return path.slice(path.lastIndexOf(separator) + 1);
}

type fileName = 'LaggingUsageProductReportDataFeed.csv' | 'FlexUsageReportDataFeed.csv' | 'SubJobsUsageReportDataFeed.csv';