/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { faker } from '@faker-js/faker';
import { subDays, format } from 'date-fns';
import type { IUser, ICreateArticle, IUpdateArticle } from '../types';

export const getRandomArticle = (): ICreateArticle => ({
  title: `E2E ${faker.lorem.word()}-${Date.now()}`,
  description: faker.lorem.words(),
  body: faker.lorem.words(),
  tagList: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
});

export const getRandomUpdateArticle = ({
  slug,
  favorited = false,
  favoritesCount = 0,
}: {
  slug: string;
  favorited?: boolean;
  favoritesCount?: number;
  user: IUser;
  following?: boolean;
}): IUpdateArticle => ({
  slug,
  title: `E2E ${faker.lorem.word()}-${Date.now()}`,
  description: faker.lorem.words(),
  body: faker.lorem.words(),
  createdAt: format(subDays(new Date(), 1), "yyyy-MM-dd'T'HH:mm:ss.SSS+00:00"),
  updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSS+00:00"),
  tagList: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
  favorited,
  favoritesCount,
});
