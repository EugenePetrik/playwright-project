export interface ICreateArticleRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
    author: {
      username?: string;
      image?: string;
      following?: boolean;
    };
  };
}

export interface IUpdateArticleRequest {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList: string[];
    favorited: boolean;
    favoritesCount: number;
    author: {
      username?: string;
      image?: string;
      following?: boolean;
    };
  };
}

export type ArticleResponse = IUpdateArticleRequest;

export interface ArticlesResponse {
  articles: Array<{
    slug: string;
    title: string;
    description: string;
    body: string;
    createdAt: string;
    updatedAt: string;
    tagList: string[];
    favorited: boolean;
    favoritesCount: number;
    author: {
      username?: string;
      image?: string;
      following?: boolean;
    };
  }>;
  articlesCount: number;
}
