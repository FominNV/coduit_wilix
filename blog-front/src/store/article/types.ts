export interface IArticle {
  slug: string;
  title: string;
  description: string;
  body: string;
  author: { username: string };
  tagList: string[] | [];
  favoritesCount?: number;
  comments: string[] | [];
  createdAt: string;
  favorited: boolean;
}

export interface IArticleState {
  articles: IArticle[] | undefined;
  feedArticles: IArticle[] | undefined;
  editArticle: IArticle | undefined;
  editorMode: EDITOR_MODE;
  tags: string[] | undefined;
  error: Error | undefined;
  formFetchMode: FETCH_MODE;
  buttonFetchMode: FETCH_MODE;
  articleFetchMode: FETCH_MODE;
  comments: IComment[] | [];
  newArticle: {
    title: string;
  };
}

export interface IArticleCreateProps {
  title: string;
  description: string;
  body: string;
  tagList: string[] | [];
}

export interface IComment {
  author: {
    username: string;
  };
  body: string;
  createdAt: string;
  id: string;
}

export interface ICommentCreateProps {
  body: string;
}

export enum ArticleActionTypes {
  ADD_ARTICLE = 'ADD_ARTICLE',
  UPDATE_ARTICLE = 'UPDATE_ARTICLE',
  REMOVE_ARTICLE = 'REMOVE_ARTICLE',
  GET_ARTICLE = 'GET_ARTICLE',
  SET_EDIT_ARTICLE = 'SET_EDIT_ARTICLE',
  SET_EDITOR_MODE = 'SET_EDITOR_MODE',
  GET_USER_ARTICLES = 'GET_USER_ARTICLES',
  GET_FEED_ARTICLES = 'GET_FEED_ARTICLES',
  GET_GLOBAL_ARTICLES = 'GET_GLOBAL_ARTICLES',
  GET_TAGS = 'GET_TAGS',
  SET_FORM_FETCH_MODE = 'SET_FORM_FETCH_MODE',
  SET_BUTTON_FETCH_MODE = 'SET_BUTTON_FETCH_MODE',
  SET_ARTICLE_FETCH_MODE = 'SET_ARTICLE_FETCH_MODE',
  FAVORITE_ARTICLE = 'FAVORITE_ARTICLE',
  UNFAVORITE_ARTICLE = 'UNFAVORITE_ARTICLE',
  ADD_COMMENT = 'ADD_COMMENT',
  DELETE_COMMENT = 'DELETE_COMMENT',
  GET_COMMENTS = 'GET_COMMENTS',
  SET_NEW_ARTICLE = 'SET_NEW_ARTICLE',
}

export enum URLS {
  ADD_ARTICLE_URL = '/api/articles',
  UPDATE_ARTICLE = '/api/articles/',
  REMOVE_ARTICLE_URL = '/api/articles/',
  GET_ARTICLE_URL = '/api/article',
  GET_USER_ARTICLES_URL = '/api/articles?author=',
  GET_FEED_ARTICLES_URL = '/api/articles/feed',
  GET_GLOBAL_ARTICLES_URL = '/api/articles',
  GET_TAGS_URL = '/api/tags',
  FAVORITE_ARTICLE_URL = '/api/articles/',
  UNFAVORITE_ARTICLE_URL = '/api/articles/',
  ADD_COMMENT_URL = '/api/articles/',
  DELETE_COMMENT_URL = '/api/articles/',
  GET_COMMENTS_URL = '/api/articles/',
}

export enum ARTICLE_LIST_MODE {
  HOMEPAGE_FEED_MODE = 'HOMEPAGE_FEED_MODE',
  HOMEPAGE_GLOBAL_MODE = 'HOMEPAGE_GLOBAL_MODE',
  HOMEPAGE_TAG_MODE = 'HOMEPAGE_TAG_MODE',
  PROFILE_MY_POSTS = 'PROFILE_MY_POSTS',
  PROFILE_FAVORITED_POSTS = 'PROFILE_FAVORITED_POSTS',
}

export enum EDITOR_MODE {
  CREATE_MODE = 'CREATE_MODE',
  EDIT_MODE = 'EDIT_MODE',
}

export enum FETCH_MODE {
  NO_FETCH = 'NO_FETCH',
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
}

export type fetchOptions = {
  method: FETCH_METHOD;
  headers: { 'Content-Type': string; Authorization?: string };
  body?: string;
};

export enum FETCH_METHOD {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export enum FAVORITE_BTN_MODE {
  CARD_MODE = 'CARD_MODE',
  ARTICLE_MODE = 'ARTICLE_MODE',
}

type AddArticleAction = {
  type: ArticleActionTypes.ADD_ARTICLE;
  payload: { articles: IArticle[]; formFetchMode: FETCH_MODE };
};

type UpdateArticleAction = {
  type: ArticleActionTypes.UPDATE_ARTICLE;
  payload: { articles: IArticle[]; formFetchMode: FETCH_MODE };
};

type RemoveArticleAction = {
  type: ArticleActionTypes.REMOVE_ARTICLE;
  payload: {
    articles: IArticle[];
    buttonFetchMode: FETCH_MODE;
    formFetchMode: FETCH_MODE;
  };
};

type SetEditArticleAction = {
  type: ArticleActionTypes.SET_EDIT_ARTICLE;
  payload: { editArticle: IArticle };
};

type SetEditModeAction = {
  type: ArticleActionTypes.SET_EDITOR_MODE;
  payload: { editorMode: EDITOR_MODE };
};

type GetUserArticlesAction = {
  type: ArticleActionTypes.GET_USER_ARTICLES;
  payload: { articles: IArticle[]; articleFetchMode: FETCH_MODE };
};

type GetFeedArticleAction = {
  type: ArticleActionTypes.GET_FEED_ARTICLES;
  payload: { feedArticles: { articles: IArticle[] }; articleFetchMode: FETCH_MODE };
};

type GetGlobalArticleAction = {
  type: ArticleActionTypes.GET_GLOBAL_ARTICLES;
  payload: { articles: IArticle[]; articleFetchMode: FETCH_MODE };
};

type GetTagsAction = {
  type: ArticleActionTypes.GET_TAGS;
  payload: { tags: string[] | [] };
};

type SetFormFetchModeAction = {
  type: ArticleActionTypes.SET_FORM_FETCH_MODE;
  payload: { formFetchMode: FETCH_MODE };
};

type SetButtonFetchModeAction = {
  type: ArticleActionTypes.SET_BUTTON_FETCH_MODE;
  payload: { buttonFetchMode: FETCH_MODE };
};

type SetArticleFetchModeAction = {
  type: ArticleActionTypes.SET_ARTICLE_FETCH_MODE;
  payload: { articleFetchMode: FETCH_MODE };
};

type FavoriteArticleAction = {
  type: ArticleActionTypes.FAVORITE_ARTICLE;
  payload: { articles: IArticle[]; buttonFetchMode: FETCH_MODE };
};

type UnfavoriteArticleAction = {
  type: ArticleActionTypes.UNFAVORITE_ARTICLE;
  payload: { articles: IArticle[]; buttonFetchMode: FETCH_MODE };
};

type AddCommentAction = {
  type: ArticleActionTypes.ADD_COMMENT;
  payload: { comments: IComment[] | []; formFetchMode: FETCH_MODE };
};

type DeleteCommentAction = {
  type: ArticleActionTypes.DELETE_COMMENT;
  payload: { comments: IComment[] | []; buttonFetchMode: FETCH_MODE };
};

type GetCommentsAction = {
  type: ArticleActionTypes.GET_COMMENTS;
  payload: { comments: IComment[] | []; articleFetchMode: FETCH_MODE };
};

type SetNewArticleAction = {
  type: ArticleActionTypes.SET_NEW_ARTICLE;
  payload: { newArticle: { title: string } };
};

export type ArticleAction =
  | AddArticleAction
  | UpdateArticleAction
  | RemoveArticleAction
  | SetEditArticleAction
  | SetEditModeAction
  | GetUserArticlesAction
  | GetFeedArticleAction
  | GetGlobalArticleAction
  | GetTagsAction
  | SetFormFetchModeAction
  | SetButtonFetchModeAction
  | FavoriteArticleAction
  | UnfavoriteArticleAction
  | AddCommentAction
  | DeleteCommentAction
  | GetCommentsAction
  | SetNewArticleAction
  | SetArticleFetchModeAction;
