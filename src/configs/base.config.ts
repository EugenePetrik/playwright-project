import dotenv from 'dotenv';

dotenv.config();

const BaseConfig = {
  webURL: process.env.WEB_URL,
  apiURL: process.env.API_URL,
  logLevel: process.env.LOG_LEVEL ?? 'debug',
  accessibilityTags: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
  accessibilityRules: ['color-contrast', 'link-name', 'empty-heading', 'heading-order', 'image-alt'],
};

export default BaseConfig;
