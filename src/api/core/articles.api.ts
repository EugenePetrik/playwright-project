import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIRoutes } from '../../utils/api/routes';
import { APIClient } from './api.client';
import type { ICreateArticleRequest, IUpdateArticleRequest } from '../../utils/types';

export class ArticleAPIClient extends APIClient {
  constructor(public context: APIRequestContext) {
    super(context);
  }

  async getArticleAPI(articleSlug: string): Promise<APIResponse> {
    return this.context.get(`/api/${APIRoutes.Articles}/${articleSlug}`);
  }

  async getArticlesAPI(): Promise<APIResponse> {
    return this.context.get(`/api/${APIRoutes.Articles}?offset=0&limit=10`);
  }

  async createArticleAPI(data: ICreateArticleRequest): Promise<APIResponse> {
    return this.context.post(`/api/${APIRoutes.Articles}`, { data });
  }

  async updateArticleAPI(articleSlug: string, data: IUpdateArticleRequest): Promise<APIResponse> {
    return this.context.put(`/api/${APIRoutes.Articles}/${articleSlug}`, { data });
  }

  async deleteArticleAPI(articleSlug: string): Promise<APIResponse> {
    return this.context.delete(`/api/${APIRoutes.Articles}/${articleSlug}`);
  }
}
