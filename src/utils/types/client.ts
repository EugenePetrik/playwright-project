import { APIRequestContext } from '@playwright/test';

export interface IAPIClient {
  context: APIRequestContext;
}
