import type { APIRequestContext } from '@playwright/test';
import { getDefaultAPIContext } from '../../api/context/default.context';
import { UsersAPIClient } from '../../api/core/users.api';
import { getAuthAPIContext } from '../../api/context/auth.context';
import type { IAuthUser, IUser } from '../types';

export async function getDefaultContext(): Promise<APIRequestContext> {
  return getDefaultAPIContext();
}

export async function getAuthContext({ user, token }: { user?: IUser; token?: string }): Promise<APIRequestContext> {
  return getAuthAPIContext({ user, token });
}

export async function createUser(user: IUser): Promise<IAuthUser> {
  const context = await getDefaultContext();
  const userClient = new UsersAPIClient(context);
  return userClient.signUpUserAPI(user);
}

export async function createUserAndGetToken(user: IUser): Promise<string> {
  const context = await getDefaultContext();
  const userClient = new UsersAPIClient(context);
  return userClient.signUpUserAPIAndGetToken(user);
}
