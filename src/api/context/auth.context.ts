import { type APIRequestContext, request } from '@playwright/test';
import { getDefaultAPIContext } from './default.context';
import type { IUser } from '../../utils/types';
import BaseConfig from '../../configs/base.config';
import { UsersAPIClient } from '../core/users.api';

export const getAuthAPIContext = async ({ user, token }: { user?: IUser; token?: string }): Promise<APIRequestContext> => {
  let extraHTTPHeaders: { [key: string]: string } = {
    accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
  };

  if (!user && !token) {
    throw Error('Provide "user" or "token"');
  }

  if (user && !token) {
    const context = await getDefaultAPIContext();
    const userClient = new UsersAPIClient(context);
    const token = await userClient.loginUserAPIAndGetToken(user);

    extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Token ${token}` };
  }

  if (token && !user) {
    extraHTTPHeaders = { ...extraHTTPHeaders, Authorization: `Token ${token}` };
  }

  return request.newContext({
    baseURL: BaseConfig.apiURL,
    extraHTTPHeaders,
  });
};
