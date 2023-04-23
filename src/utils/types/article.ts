export interface ICreateArticle {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}

export interface IUpdateArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author?: {
    username: string;
    image: string;
    following: boolean;
  };
}

export interface IArticleResponse {
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

export interface IArticlesResponse {
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
