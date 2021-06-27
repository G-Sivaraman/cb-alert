import * as AWS_IMPORT from 'aws-sdk'; // for type defs, not sure how to do both here
const AWS = require('aws-sdk');

export interface Configuration {
  sendGridApiKey: string;
}

let ssm;
let config: Configuration;
let logger = console;

const PRODUCTION_ENV = 'produs';
/* match strings for SSM parameters */
export enum SSM_PARAM_MATCHES {
  sendGridApiKey = 'SEND_GRID_API_KEY'
}

export const getEnvironment = () => process.env.ENVIRONMENT;
export const isProduction = () => getEnvironment() === PRODUCTION_ENV;
export const isRunningLocally = () => getEnvironment() === 'local';

export const getConfiguration = async (): Promise<Configuration> => {
  if (!!config) {
    return config;
  };

  if (isRunningLocally()) {
    logger.info('Running locally, loading env vars');

    config = buildConfigFromEnv();
  } else {
    logger.info(`Running in ${getEnvironment()}, fetching ssm vars`);

    const ssmResponse = await fetchSsmParams(buildParamList());
    config = buildConfigFromSsm([...ssmResponse.Parameters]);
  }

  logger.info('CURRENT CONFIG: ', config);
  return config;
}

const getSSM = () => {
  if (!ssm) {
    ssm = new AWS.SSM()
  }

  return ssm;
}

const buildConfigFromEnv = (): Configuration => {
  return {
    sendGridApiKey: 'SG.3UELFTTcSJCJUDNvNMJH1Q.OmHm4JbHt7gJArJb8s_K1na0eIMg2Yzjq7KV_TG1lS'
  }
}

const buildConfigFromSsm = (params: AWS_IMPORT.SSM.Types.ParameterList): Configuration => {
  logger.info('Building config from SSM params: ', params);
  const config: Configuration = params.reduce(
    (acc, item) => {
      if (item.Name.includes(SSM_PARAM_MATCHES.sendGridApiKey)) {
        acc.sendGridApiKey = item.Value;
      }

      return acc;
    }, {} as Configuration
  );

  return config;
}

const buildParamList = (encrypted = false) => {
  const env = getEnvironment();

  const paramList = [
    `/ALERTS/${env}/${SSM_PARAM_MATCHES.sendGridApiKey}`
  ];

  return paramList;
}

const fetchSsmParams = async (params: string[], decryption = false): Promise<AWS_IMPORT.SSM.Types.GetParametersResult> => {
  const ssm = getSSM();

  let req: AWS_IMPORT.SSM.Types.GetParametersRequest = {
    Names: [...params],
    WithDecryption: decryption
  }

  return await ssm.getParameters(req).promise();
};

