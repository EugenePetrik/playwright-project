import { type APIRequestContext } from '@playwright/test';
import { APIRoutes } from '../../utils/api/routes';
import type { IAuthUser, IUser } from '../../utils/types';
import { APIClient } from './api.client';
import logger from '../../configs/logger';

export class UsersAPIClient extends APIClient {
  constructor(public context: APIRequestContext) {
    super(context);
  }

  async signUpUserAPI(user: IUser): Promise<IAuthUser> {
    logger.debug(`Sign up user via API - ${JSON.stringify(user)}`);
    const response = await this.context.post(`/api/${APIRoutes.Users}`, { data: { user } });
    return response.json() as Promise<IAuthUser>;
  }

  async loginUserAPI(user: Omit<IUser, 'username'>): Promise<IAuthUser> {
    logger.debug(`Sign in user via API - ${JSON.stringify(user)}`);
    const response = await this.context.post(`/api/${APIRoutes.Users}/login`, { data: { user } });
    return response.json() as Promise<IAuthUser>;
  }

  async signUpUserAPIAndGetToken(user: IUser): Promise<string> {
    const response = await this.signUpUserAPI(user);
    return response.user.token;
  }

  async loginUserAPIAndGetToken(user: IUser): Promise<string> {
    const response = await this.loginUserAPI(user);
    return response.user.token;
  }
}
