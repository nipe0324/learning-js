import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import ArticlePreview from '../article/ArticlePreview';
import Loading from '../common/Loading';
// import Pagination from '../common/Pagination';

// import { getArticles } from '../../api/article';
import { ArticleProps } from '../../types';
import { pageAtom } from '../../atom';

interface FeedProps {
  query: string;
  url: string;
  limit: number;
}

const Feed = ({ query, url, limit }: FeedProps) => {
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [articlesCount, setArticlesCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useRecoilState(pageAtom);

  useEffect(() => {
    setPage(1);
  }, [setPage, query]);

  if (loading) {
    return (
      <div className="article-preview">
        <Loading height={30} />
      </div>
    );
  }

  if (articlesCount === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  }

  return (
    <>
      {articles.map((article) => (
        <ArticlePreview key={article.slug} article={article} />
      ))}
      {/* <Pagination articlesCount={articlesCount} url={url} /> */}
    </>
  );
};

export default Feed;
