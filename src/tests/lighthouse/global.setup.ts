import { rm } from 'fs';
import { join } from 'path';
import logger from '../../configs/logger';

function globalSetup() {
  rm(join(process.cwd(), 'reports'), { recursive: true }, () => logger.debug('lighthouse-html-report directory removed'));
}

export default globalSetup;
