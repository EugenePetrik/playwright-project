import { type APIRequestContext, type APIResponse } from '@playwright/test';
import { APIRoutes } from '../../utils/api/routes';
import { APIClient } from './api.client';
import type { IArticleResponse, IArticlesResponse, ICreateArticle, IUpdateArticle } from '../../utils/types';
import logger from '../../configs/logger';

export class ArticleAPIClient extends APIClient {
  constructor(public context: APIRequestContext) {
    super(context);
  }

  async getArticleAPI(articleSlug: string): Promise<IArticleResponse> {
    const response = await this.context.get(`/api/${APIRoutes.Articles}/${articleSlug}`);
    return response.json() as Promise<IArticleResponse>;
  }

  async getArticlesAPI(): Promise<IArticlesResponse> {
    const response = await this.context.get(`/api/${APIRoutes.Articles}?offset=0&limit=10`);
    return response.json() as Promise<IArticlesResponse>;
  }

  async createArticleAPI(article: ICreateArticle): Promise<IArticleResponse> {
    logger.debug(`Create article with - ${JSON.stringify(article)}`);
    const response = await this.context.post(`/api/${APIRoutes.Articles}`, { data: { article } });
    return response.json() as Promise<IArticleResponse>;
  }

  async updateArticleAPI(articleSlug: string, article: IUpdateArticle): Promise<IArticleResponse> {
    logger.debug(`Update article with slug - "${articleSlug}" and data - ${JSON.stringify(article)}`);
    const response = await this.context.put(`/api/${APIRoutes.Articles}/${articleSlug}`, { data: { article } });
    return response.json() as Promise<IArticleResponse>;
  }

  async addArticleToFavoriteAPI(articleSlug: string): Promise<IArticleResponse> {
    logger.debug(`Add article with slug "${articleSlug}" to favorite`);
    const response = await this.context.post(`/api/${APIRoutes.Articles}/${articleSlug}/favorite`);
    return response.json() as Promise<IArticleResponse>;
  }

  async deleteArticleAPI(articleSlug: string): Promise<APIResponse> {
    logger.debug(`Delete article with slug "${articleSlug}"`);
    return this.context.delete(`/api/${APIRoutes.Articles}/${articleSlug}`);
  }
}
