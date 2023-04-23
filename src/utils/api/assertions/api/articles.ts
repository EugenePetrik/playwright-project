import { expectNotToContain, expectToEqual } from '../solutions';
import type { IArticleResponse, ICreateArticle, IUpdateArticle, IArticlesResponse } from '../../../types';

export const assertArticleTitle = async ({
  actualArticle,
  expectedArticle,
}: {
  actualArticle: IArticleResponse;
  expectedArticle: ICreateArticle | IUpdateArticle;
}) => {
  await expectToEqual({
    actual: actualArticle.article.title,
    expected: expectedArticle.title,
    description: 'Article title',
  });
};

export const assertArticleSlug = async ({
  actualArticle,
  expectedArticle,
}: {
  actualArticle: IArticleResponse;
  expectedArticle: IArticleResponse;
}) => {
  await expectToEqual({
    actual: actualArticle.article.slug,
    expected: expectedArticle.article.slug,
    description: 'article slug',
  });
};

export const assertArticlesNotContainArticle = async ({
  actualArticle,
  expectedArticle,
}: {
  actualArticle: IArticlesResponse;
  expectedArticle: IArticleResponse;
}) => {
  await expectNotToContain({
    actual: actualArticle.articles.map(({ title }) => title),
    expected: expectedArticle.article.title,
    description: 'articles titles array',
  });
};
