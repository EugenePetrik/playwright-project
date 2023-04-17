import { APIRequestContext, APIResponse } from '@playwright/test';
import { APIRoutes } from '../../utils/api/routes';
import { APIClient } from './api.client';
import type { ICreateArticleRequest, IUpdateArticleRequest } from '../../utils/types';
import logger from '../../configs/logger';

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
    logger.debug(`Create article with - ${JSON.stringify(data)}`);
    return this.context.post(`/api/${APIRoutes.Articles}`, { data });
  }

  async updateArticleAPI(articleSlug: string, data: IUpdateArticleRequest): Promise<APIResponse> {
    logger.debug(`Update article with - ${JSON.stringify(data)}`);
    return this.context.put(`/api/${APIRoutes.Articles}/${articleSlug}`, { data });
  }

  async addArticleToFavoriteAPI(articleSlug: string): Promise<APIResponse> {
    logger.debug(`Add article with slug "${articleSlug}" to favorite`);
    return this.context.post(`/api/${APIRoutes.Articles}/${articleSlug}/favorite`);
  }

  async deleteArticleAPI(articleSlug: string): Promise<APIResponse> {
    return this.context.delete(`/api/${APIRoutes.Articles}/${articleSlug}`);
  }
}
