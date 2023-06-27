import { GET, POST, PUT, DELETE } from './config';

interface articleApiBodyProps {
  article: {
    title: string;
    description: string;
    body: string;
    tagsList: string[];
  };
}

export const getArticles = (query: string, signal: AbortSignal) =>
  GET(`/articles${query}`, signal);

export const createArticle = (body: articleApiBodyProps) =>
  POST('/articles', body);

export const getArticle = (slug: string) => GET(`/articles/${slug}`);

export const updateArticle = (slug: string, body: articleApiBodyProps) =>
  PUT(`/articles/${slug}`, body);

export const deleteArticle = (slug: string) => DELETE(`/articles/${slug}`);
