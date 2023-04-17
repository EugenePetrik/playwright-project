import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIRoutes } from '../../utils/api/routes';
import type { IAuthUser, IUser } from '../../utils/types';
import { APIClient } from './api.client';
import logger from '../../configs/logger';

export class UsersAPIClient extends APIClient {
  constructor(public context: APIRequestContext) {
    super(context);
  }

  async signUpUserAPI(user: IUser): Promise<APIResponse> {
    logger.debug(`Sign up user via API - ${JSON.stringify(user)}`);
    return this.context.post(`/api/${APIRoutes.Users}`, { data: { user } });
  }

  async loginUserAPI(user: Omit<IUser, 'username'>): Promise<APIResponse> {
    logger.debug(`Sign in user via API - ${JSON.stringify(user)}`);
    return this.context.post(`/api/${APIRoutes.Users}/login`, { data: { user } });
  }

  async signUpUserAPIAndGetToken(user: IUser): Promise<string> {
    const response = await this.signUpUserAPI(user);
    const json = (await response.json()) as IAuthUser;
    return json.user.token;
  }

  async loginUserAPIAndGetToken(user: IUser): Promise<string> {
    const response = await this.loginUserAPI(user);
    const json = (await response.json()) as IAuthUser;
    return json.user.token;
  }
}
