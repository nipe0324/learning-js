import { GET, POST, PUT, DELETE } from './config';

interface articleApiBodyProps {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}

export const getArticles = (query: string, signal: AbortSignal) =>
  GET(`/articles${query}`, signal);

export const createArticle = (body: articleApiBodyProps) =>
  POST('/articles', body);
