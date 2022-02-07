import { getToken } from '../../utils/common/common';
import { fetchOptions, FETCH_METHOD, IArticle, IArticleCreateProps } from './types';

export const createFetchOptions = () => {
  const addArticleOptions = (data: IArticleCreateProps): fetchOptions => {
    return {
      method: FETCH_METHOD.POST,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify({ article: data }),
    };
  };

  const updateArticleOptions = (data: IArticleCreateProps): fetchOptions => {
    return {
      method: FETCH_METHOD.PUT,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify({ article: data }),
    };
  };

  const removeArticleOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.DELETE,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getArticleOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.GET,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getFeedArticlesOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.GET,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getUserArticlesOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.GET,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getGlobalArticlesOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.GET,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getTagsOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.GET,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
    };
  };

  const favoriteArticleOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.POST,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const unfavoriteArticleOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.DELETE,
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const addCommentOptions = (data: string): fetchOptions => {
    return {
      method: FETCH_METHOD.POST,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
      body: JSON.stringify({ comment: { body: data } }),
    };
  };

  const deleteCommentOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.DELETE,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  const getCommentsOptions = (): fetchOptions => {
    return {
      method: FETCH_METHOD.GET,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Token ${getToken()}`,
      },
    };
  };

  return {
    addArticleOptions,
    updateArticleOptions,
    removeArticleOptions,
    getArticleOptions,
    getGlobalArticlesOptions,
    getUserArticlesOptions,
    getFeedArticlesOptions,
    getTagsOptions,
    favoriteArticleOptions,
    unfavoriteArticleOptions,
    addCommentOptions,
    deleteCommentOptions,
    getCommentsOptions,
  };
};
