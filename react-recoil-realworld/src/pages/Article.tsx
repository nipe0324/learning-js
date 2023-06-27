import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useRecoilValue } from 'recoil';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import Loading from '../components/common/Loading';
import ArticleTag from '../components/tag/ArticleTag';
// import ArticleAction from '../components/article/ArticleAction';
// import Comment from '../components/article/comment';

import { getArticle, deleteArticle } from '../api/article';

import { isLoggedInAtom, userAtom } from '../atom';
import { ArticleProps, CommentProps } from '../types';
import { convertToDate } from '../utils';

const Article = () => {
  const [article, setArticle] = useState<ArticleProps>({
    slug: '',
    title: '',
    description: '',
    tagsList: [],
    body: '',
    createdAt: '',
    favorited: false,
    favoritesCount: 0,
    author: {
      username: '',
      bio: '',
      image: '',
      following: false,
    },
  });
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<CommentProps[]>([]);
  const [isUser, setIsUser] = useState(false);
  const [pageTitle, setPageTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const isLoggedIn = useRecoilValue(isLoggedInAtom);
  const user = useRecoilValue(userAtom);
  const { urlSlug } = useParams();
  const navigate = useNavigate();

  const onChangeComment = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setComment(value);
  };

  const removeArticle = async () => {
    try {
      await deleteArticle(urlSlug!);
      navigate(-1);
    } catch (e: any) {
      console.error("Can't delete article", e);
    }
  };

  // TODO: Create and delete comment
  // const createComment = async () => {}
  // const removeComment = async () => {}

  // TODO: Follow and Unfollow
  // const follow = async () => {}
  // const unfollow = async () => {}

  // TODO: Favorite and Unfavorite
  // const favorite = async () => {}
  // const unfavorite = async () => {}

  useEffect(() => {
    const initArticle = async () => {
      setLoading(true);
      try {
        const { article } = await getArticle(urlSlug!);
        console.log('fetch', article);
        setArticle(article);
        setPageTitle(article.title);
        setIsUser(article.author.username === user.username);
      } catch (e: any) {
        navigate('/', { replace: true });
      }
      setLoading(false);
    };

    initArticle();
  }, [urlSlug, user.username, navigate]);

  // TODO: useEffect initComments

  if (loading) return <Loading height={75} />;

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>
      </HelmetProvider>

      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>

            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image} alt={article.author.username} />
              </Link>
              <div className="info">
                <Link
                  to={`/profile/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}
                </Link>
                <span className="date">{convertToDate(article.createdAt)}</span>
              </div>

              {/* TODO: ArticleAction */}
            </div>
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <ReactMarkdown
                children={article.body!}
                remarkPlugins={[remarkGfm]}
              />
            </div>
          </div>
          <div>
            {article.tagsList.map((tag) => (
              <ArticleTag key={tag} name={tag} />
            ))}
          </div>
          <hr />
          <div className="article-actions">
            <div className="article-meta">
              <Link to={`/profile/${article.author.username}`}>
                <img src={article.author.image} />
              </Link>
              <div className="info">
                <Link
                  to={`/profile/${article.author.username}`}
                  className="author"
                >
                  {article.author.username}
                </Link>
                <span className="date">{convertToDate(article.createdAt)}</span>
              </div>

              {/* TODO: ArticleAction */}
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              {isLoggedIn ? (
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows={3}
                      value={comment}
                      onChange={onChangeComment}
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <img src={user.image} className="comment-author-img" />
                    <button
                      className="btn btn-sm btn-primary"
                      disabled={disabled}
                    >
                      Post Comment
                    </button>
                  </div>
                </form>
              ) : (
                <p>
                  <Link to="/login">Sign in</Link> or{' '}
                  <Link to="/register">Sign up</Link> to add comments on this
                  article.
                </p>
              )}
              {/* TODO: {comments.map(comment => ( */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
