import dotenv from 'dotenv';

dotenv.config();

const BaseConfig = {
  webURL: process.env.WEB_URL,
  apiURL: process.env.API_URL,
  logLevel: process.env.LOG_LEVEL ?? 'debug',
};

export default BaseConfig;
