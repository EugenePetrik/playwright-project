import winston from 'winston';
import BaseConfig from './base.config';

const logger = winston.createLogger({
  level: BaseConfig.logLevel,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    winston.format.printf(({ timestamp, message }) => `${timestamp} : ${message}`),
  ),
  transports: [new winston.transports.Console()],
});

export default logger;
