import { Dispatch } from 'redux';
import fetchAction from './fetchAction';
import { createFetchOptions } from './createFetchOptions';
import {
  ArticleActionTypes,
  ArticleAction,
  IArticle,
  URLS,
  EDITOR_MODE,
  FETCH_MODE,
  IArticleCreateProps,
} from './types';

// add article
export const addArticle =
  (body: IArticleCreateProps) => async (dispatch: Dispatch<ArticleAction>) => {
    const { addArticleOptions } = createFetchOptions();
    const { getGlobalArticlesOptions } = createFetchOptions();

    await fetchAction(URLS.ADD_ARTICLE_URL, addArticleOptions(body));

    const { data, error } = await fetchAction(
      URLS.GET_GLOBAL_ARTICLES_URL,
      getGlobalArticlesOptions()
    );

    if (error) {
      throw new Error("Can't add article: " + error);
    }

    dispatch({
      type: ArticleActionTypes.ADD_ARTICLE,
      payload: { articles: data, formFetchMode: FETCH_MODE.FETCHED },
    });
  };

// update article
export const updateArticle =
  (body: IArticleCreateProps, slug: string) => async (dispatch: Dispatch<ArticleAction>) => {
    const { updateArticleOptions } = createFetchOptions();
    const { getGlobalArticlesOptions } = createFetchOptions();
    const url = URLS.UPDATE_ARTICLE + slug;

    await fetchAction(url, updateArticleOptions(body));

    const { data, error } = await fetchAction(
      URLS.GET_GLOBAL_ARTICLES_URL,
      getGlobalArticlesOptions()
    );

    if (error) {
      throw new Error("Can't update article: " + error);
    }

    dispatch({
      type: ArticleActionTypes.UPDATE_ARTICLE,
      payload: { articles: data, formFetchMode: FETCH_MODE.FETCHED },
    });
  };

// remove article
export const removeArticle = (slug: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { removeArticleOptions } = createFetchOptions();
  const { getGlobalArticlesOptions } = createFetchOptions();
  const url = URLS.REMOVE_ARTICLE_URL + slug;

  await fetchAction(url, removeArticleOptions());

  const { data, error } = await fetchAction(
    URLS.GET_GLOBAL_ARTICLES_URL,
    getGlobalArticlesOptions()
  );

  if (error) {
    throw new Error("Can't update article: " + error);
  }

  {
    dispatch({
      type: ArticleActionTypes.REMOVE_ARTICLE,
      payload: {
        articles: data,
        buttonFetchMode: FETCH_MODE.FETCHED,
        formFetchMode: FETCH_MODE.FETCHED,
      },
    });
  }
};

// set article for edition
export const setEditArticle = (article: IArticle) => (dispatch: Dispatch<ArticleAction>) => {
  dispatch({
    type: ArticleActionTypes.SET_EDIT_ARTICLE,
    payload: { editArticle: article },
  });
};

// set mode of editor
export const setEditorMode = (editorMode: EDITOR_MODE) => (dispatch: Dispatch<ArticleAction>) => {
  dispatch({
    type: ArticleActionTypes.SET_EDITOR_MODE,
    payload: { editorMode },
  });
};

// get user articles
export const getUserArticles = (author: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { getUserArticlesOptions } = createFetchOptions();
  const url = URLS.GET_USER_ARTICLES_URL + author;

  const { data, error } = await fetchAction(url, getUserArticlesOptions());

  if (error) {
    throw new Error("Can't get user articles: " + error);
  }

  dispatch({
    type: ArticleActionTypes.GET_USER_ARTICLES,
    payload: { articles: data, articleFetchMode: FETCH_MODE.FETCHED },
  });
};

// get feed articles
export const getFeedArticles = () => async (dispatch: Dispatch<ArticleAction>) => {
  const { getFeedArticlesOptions } = createFetchOptions();
  const url = URLS.GET_FEED_ARTICLES_URL;

  const { data, error } = await fetchAction(url, getFeedArticlesOptions());

  if (error) {
    throw new Error("Can't get feed articles: " + error);
  }

  dispatch({
    type: ArticleActionTypes.GET_FEED_ARTICLES,
    payload: { feedArticles: data, articleFetchMode: FETCH_MODE.FETCHED },
  });
};

// get global articles
export const getGlobalArticles = () => async (dispatch: Dispatch<ArticleAction>) => {
  const { getGlobalArticlesOptions } = createFetchOptions();

  const { data, error } = await fetchAction(
    URLS.GET_GLOBAL_ARTICLES_URL,
    getGlobalArticlesOptions()
  );

  if (error) {
    throw new Error("Can't get articles: " + error);
  }

  dispatch({
    type: ArticleActionTypes.GET_GLOBAL_ARTICLES,
    payload: { articles: data, articleFetchMode: FETCH_MODE.FETCHED },
  });
};

// get tags
export const getTags = () => async (dispatch: Dispatch<ArticleAction>) => {
  const { getTagsOptions } = createFetchOptions();

  const { data, error } = await fetchAction(URLS.GET_TAGS_URL, getTagsOptions());

  if (error) {
    throw new Error("Can't get articles: " + error);
  }

  dispatch({ type: ArticleActionTypes.GET_TAGS, payload: { tags: data } });
};

// set fetch mode for forms
export const setFormFetchMode = (mode: FETCH_MODE) => (dispatch: Dispatch<ArticleAction>) => {
  dispatch({
    type: ArticleActionTypes.SET_FORM_FETCH_MODE,
    payload: { formFetchMode: mode },
  });
};

// set fetch mode for buttons
export const setButtonFetchMode = (mode: FETCH_MODE) => (dispatch: Dispatch<ArticleAction>) => {
  dispatch({
    type: ArticleActionTypes.SET_BUTTON_FETCH_MODE,
    payload: { buttonFetchMode: mode },
  });
};

// set fetch mode for list of articles
export const setArticleFetchMode = (mode: FETCH_MODE) => (dispatch: Dispatch<ArticleAction>) => {
  dispatch({
    type: ArticleActionTypes.SET_ARTICLE_FETCH_MODE,
    payload: { articleFetchMode: mode },
  });
};

// favorite article
export const favoriteArticle = (slug: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { getGlobalArticlesOptions, favoriteArticleOptions } = createFetchOptions();
  const url = URLS.FAVORITE_ARTICLE_URL + slug + '/favorite/';

  await fetchAction(url, favoriteArticleOptions());

  const { data, error } = await fetchAction(
    URLS.GET_GLOBAL_ARTICLES_URL,
    getGlobalArticlesOptions()
  );

  if (error) {
    throw new Error("Can't unfavorite article: " + error);
  }

  dispatch({
    type: ArticleActionTypes.FAVORITE_ARTICLE,
    payload: { articles: data, buttonFetchMode: FETCH_MODE.FETCHED },
  });
};

// unfavorite article
export const unfavoriteArticle = (slug: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { getGlobalArticlesOptions, unfavoriteArticleOptions } = createFetchOptions();
  const url = URLS.UNFAVORITE_ARTICLE_URL + slug + '/favorite/';

  await fetchAction(url, unfavoriteArticleOptions());

  const { data, error } = await fetchAction(
    URLS.GET_GLOBAL_ARTICLES_URL,
    getGlobalArticlesOptions()
  );

  if (error) {
    throw new Error("Can't favorite article: " + error);
  }

  dispatch({
    type: ArticleActionTypes.UNFAVORITE_ARTICLE,
    payload: { articles: data, buttonFetchMode: FETCH_MODE.FETCHED },
  });
};

// add comment to an article
export const addComment =
  (slug: string, body: string) => async (dispatch: Dispatch<ArticleAction>) => {
    const { addCommentOptions, getCommentsOptions } = createFetchOptions();
    const url = URLS.ADD_COMMENT_URL + slug + '/comments';

    await fetchAction(url, addCommentOptions(body));
    const { data, error } = await fetchAction(url, getCommentsOptions());

    if (error) {
      throw new Error("Can't add comment: " + error);
    }

    dispatch({
      type: ArticleActionTypes.ADD_COMMENT,
      payload: { comments: data, formFetchMode: FETCH_MODE.FETCHED },
    });
  };

// delete comment
export const deleteComment =
  (slug: string, id: string) => async (dispatch: Dispatch<ArticleAction>) => {
    const { deleteCommentOptions, getCommentsOptions } = createFetchOptions();
    const url = URLS.DELETE_COMMENT_URL + slug + '/comments/' + id;

    await fetchAction(url, deleteCommentOptions());

    const getUrl = URLS.GET_COMMENTS_URL + slug + '/comments';
    const { data, error } = await fetchAction(getUrl, getCommentsOptions());
    if (error) {
      throw new Error("Can't delete comment: " + error);
    }

    dispatch({
      type: ArticleActionTypes.DELETE_COMMENT,
      payload: { comments: data, buttonFetchMode: FETCH_MODE.FETCHED },
    });
  };

// get comments from an article
export const getComments = (slug: string) => async (dispatch: Dispatch<ArticleAction>) => {
  const { getCommentsOptions } = createFetchOptions();
  const url = URLS.GET_COMMENTS_URL + slug + '/comments';

  const { data, error } = await fetchAction(url, getCommentsOptions());

  if (error) {
    throw new Error("Can't get comments: " + error);
  }

  dispatch({
    type: ArticleActionTypes.GET_COMMENTS,
    payload: { comments: data, articleFetchMode: FETCH_MODE.FETCHED },
  });
};

// set new article
export const setNewArticle = (title: string) => (dispatch: Dispatch<ArticleAction>) => {
  dispatch({ type: ArticleActionTypes.SET_NEW_ARTICLE, payload: { newArticle: { title } } });
};
