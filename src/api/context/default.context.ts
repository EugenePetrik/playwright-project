import { APIRequestContext, request } from '@playwright/test';
import BaseConfig from '../../configs/base.config';

export const getDefaultAPIContext = async (): Promise<APIRequestContext> => {
  const extraHTTPHeaders: { [key: string]: string } = {
    accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  };

  return request.newContext({
    baseURL: BaseConfig.apiURL,
    extraHTTPHeaders,
  });
};
