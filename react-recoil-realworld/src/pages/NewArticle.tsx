import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useSetRecoilState, useRecoilValue } from 'recoil';

import EditorTag from '../components/tag/EditorTag';
import { createArticle } from '../api/article';
import { isLoggedInAtom } from '../atom';

interface ArticleProps {
  title: string;
  description: string;
  body: string;
  tag: string;
  tagsList: string[];
}

const NewArticle = () => {
  const [article, setArticle] = useState<ArticleProps>({
    title: '',
    description: '',
    body: '',
    tag: '',
    tagsList: [],
  });
  const [error, setError] = useState({
    title: '',
    description: '',
    body: '',
  });
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = useRecoilValue(isLoggedInAtom);

  const { title, description, body, tag, tagsList } = article;

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const onEnterAddTag = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      if (!tagsList.includes(tag)) {
        addTag(tag);
      }
    }
  };

  const addTag = (newTag: string) => {
    setArticle({
      ...article,
      tag: '',
      tagsList: [...tagsList, newTag],
    });
  };

  const removeTag = (target: string) => {
    setArticle({
      ...article,
      tagsList: tagsList.filter((tag: string) => tag !== target),
    });
  };

  const submitArticle = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setDisabled(true);
    try {
      const { article } = await createArticle({
        article: {
          title: title,
          description: description,
          body: body,
          tagsList: tagsList,
        },
      });
      navigate(`/article/${article.slug}`);
    } catch (e: any) {
      if (e.response.status === 422) {
        const errorMessage = e.response.data.errors;
        setError({
          title: errorMessage.title,
          description: errorMessage.description,
          body: errorMessage.body,
        });
      } else {
        setError({
          title: '',
          description: '',
          body: '',
        });
      }
    }
  };

  if (!isLoggedIn) navigate('/', { replace: true });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>New Article - Conduit</title>
        </Helmet>
      </HelmetProvider>

      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              <ul className="error-messages">
                {error.title && <li>title {error.title}</li>}
                {error.description && <li>description can't be blank</li>}
                {error.body && <li>body can't be blank</li>}
              </ul>

              <form onSubmit={(event) => submitArticle(event)}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      name="title"
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      name="description"
                      value={description}
                      onChange={onChange}
                      disabled={disabled}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      name="body"
                      value={body}
                      onChange={onChange}
                      disabled={disabled}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter tags"
                      name="tag"
                      value={tag}
                      onChange={onChange}
                      onKeyDown={onEnterAddTag}
                      disabled={disabled}
                    />
                    <div className="tag-list"></div>
                  </fieldset>

                  <div>
                    {tagsList.map((tag) => (
                      <EditorTag
                        key={tag}
                        name={tag}
                        onClick={() => removeTag(tag)}
                      />
                    ))}
                  </div>

                  <button className="btn btn-lg pull-xs-right btn-primary">
                    Create Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewArticle;
