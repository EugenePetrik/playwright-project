import { JSONSchemaType } from 'ajv';
import { IArticleResponse } from '../../../types';

export const articleSchema: JSONSchemaType<IArticleResponse> = {
  title: 'Article Response Schema',
  type: 'object',
  properties: {
    article: {
      type: 'object',
      properties: {
        slug: {
          type: 'string',
        },
        title: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        body: {
          type: 'string',
        },
        createdAt: {
          type: 'string',
        },
        updatedAt: {
          type: 'string',
        },
        tagList: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
        favorited: {
          type: 'boolean',
        },
        favoritesCount: {
          type: 'integer',
        },
        author: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
            },
            image: {
              type: 'string',
            },
            following: {
              type: 'boolean',
            },
          },
          required: ['username', 'image', 'following'],
        },
      },
      required: ['slug', 'title', 'description', 'body', 'createdAt', 'updatedAt', 'tagList', 'favorited', 'favoritesCount', 'author'],
    },
  },
  required: ['article'],
};
