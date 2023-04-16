/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { APIRequestContext } from '@playwright/test';
import BaseConfig from '../configs/base.config';
import logger from '../configs/logger';

export default class Api {
  readonly context: APIRequestContext;

  private readonly apiURL: string;

  constructor(context: APIRequestContext) {
    this.context = context;
    this.apiURL = BaseConfig.apiURL;
  }

  async createUser(user: IUser): Promise<string> {
    const { username, email, password } = user;

    logger.debug(`Create user via API with - ${JSON.stringify(user)}`);

    const users = await this.context.post(`${this.apiURL}/api/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        user: {
          username,
          email,
          password,
        },
      },
    });

    const response = (await users.json()) as IAuthUser;

    logger.debug(`Sign up user via API response - ${JSON.stringify(response)}`);

    return response.user.token;
  }

  private async sendRequest(method: 'get' | 'post' | 'delete' | 'put', url: string, slug: string, token: string, data?: any) {
    try {
      const response = await this.context[method](`${url}/${slug}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data,
      });
      return response.json();
    } catch (e) {
      throw Error(e);
    }
  }
}
