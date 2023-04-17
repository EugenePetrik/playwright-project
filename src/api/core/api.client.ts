import { APIRequestContext } from '@playwright/test';
import type { IAPIClient } from '../../utils/types';

export class APIClient implements IAPIClient {
  constructor(public context: APIRequestContext) {
    this.context = context;
  }
}
