import { MailData, } from '@sendgrid/helpers/classes/mail';
import * as configuration from '../services/configuration';
import { CBAlertEmailDeliveryRequest } from '../model/CBAlertEmailDeliveryRequest';
import { generateMailRequest } from './templete/emailTemplate';


const AWS = require('aws-sdk');

const sgMail = require('@sendgrid/mail');
//const apiKey = To-Do Store encrypted in S3

sgMail.setApiKey(apiKey)

const logger = console;

exports.sqsEgressEmailHandler = async (event, context) => {
  let config;

  // DLQ Testing
  // logger.error('CANT DO IT');
  // throw new Error('CANT DO IT');

  try {
    config = await configuration.getConfiguration();
  }
  catch (e) {
    logger.error('could not retrive configuration: ', e);
    // throw 
  }


  //test start - remove after test
  const datatest: CBAlertEmailDeliveryRequest = {
    targetAddress: 'vikash.ruhil@careerbuilder.com',
    targetName: 'vikash ruhil',
    targetData: [{
      accountDID: 'gjkdehbjcs',
      customerName: 'yfxhgjcvds',
      type: 'LAGGING_JOBS'
    }],
    templateID: 'POC_LAGGING',
    templateType: 'SMB'
  }
  const abc = generateMailRequest(datatest)

  console.log('SUCCESS?', abc);
  return;
  //test end

  console.log('event: ', event)

  const records: any[] = event.Records; // typings? https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html
  console.log('records: ', records)

  if (!records) {
    return; // ??
  }

  /* 
    A NOTE FOR THE FUTURE *** not sure what the long term timing implications are ***

    So, this loop is across an array of batches 
      - I believe the queue defaults to 1000 records max per request, which could become time consuming, maybe
    There's a way to limit the number of records each lambda reads (so limiting to 1 would prob be safe)
    There's also a way to limit the number of lambdas that actively read from the queue,
    which might be worth considering
  */

  for (let record of records) {
    try {
      const deliveries: CBAlertEmailDeliveryRequest[] = JSON.parse(record.body);
      const sgDeliverables: MailData[] = deliveries.map(generateMailRequest);
      console.log(sgDeliverables);

      await sgMail.send(sgDeliverables);
      console.log('SUCCESS?');
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body)
      }
    }
  }
}
