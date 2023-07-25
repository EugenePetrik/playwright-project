import { type APIRequestContext, type APIResponse } from '@playwright/test';
import { APIRoutes } from '../../utils/api/routes';
import { APIClient } from './api.client';
import type { ICreateArticle, IUpdateArticle } from '../../utils/types';
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

  async createArticleAPI(article: ICreateArticle): Promise<APIResponse> {
    logger.debug(`Create article with - ${JSON.stringify(article)}`);
    return this.context.post(`/api/${APIRoutes.Articles}`, { data: { article } });
  }

  async updateArticleAPI(articleSlug: string, article: IUpdateArticle): Promise<APIResponse> {
    logger.debug(`Update article with slug - "${articleSlug}" and data - ${JSON.stringify(article)}`);
    return this.context.put(`/api/${APIRoutes.Articles}/${articleSlug}`, { data: { article } });
  }

  async addArticleToFavoriteAPI(articleSlug: string): Promise<APIResponse> {
    logger.debug(`Add article with slug "${articleSlug}" to favorite`);
    return this.context.post(`/api/${APIRoutes.Articles}/${articleSlug}/favorite`);
  }

  async deleteArticleAPI(articleSlug: string): Promise<APIResponse> {
    logger.debug(`Delete article with slug "${articleSlug}"`);
    return this.context.delete(`/api/${APIRoutes.Articles}/${articleSlug}`);
  }
}
