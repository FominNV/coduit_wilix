import { ArticleAction, ArticleActionTypes, EDITOR_MODE, FETCH_MODE, IArticleState } from './types';

const initialState: IArticleState = {
  articles: undefined,
  feedArticles: undefined,
  editArticle: undefined,
  editorMode: EDITOR_MODE.CREATE_MODE,
  tags: undefined,
  error: undefined,
  formFetchMode: FETCH_MODE.NO_FETCH,
  buttonFetchMode: FETCH_MODE.NO_FETCH,
  articleFetchMode: FETCH_MODE.NO_FETCH,
  comments: [],
  newArticle: { title: '' },
};

export function articleReducer(
  state: IArticleState = initialState,
  action: ArticleAction
): IArticleState {
  switch (action.type) {
    case ArticleActionTypes.ADD_ARTICLE:
      return { ...state, ...action.payload.articles, formFetchMode: action.payload.formFetchMode };

    case ArticleActionTypes.UPDATE_ARTICLE:
      return { ...state, ...action.payload.articles, formFetchMode: action.payload.formFetchMode };

    case ArticleActionTypes.REMOVE_ARTICLE:
      return {
        ...state,
        ...action.payload.articles,
        formFetchMode: action.payload.formFetchMode,
        buttonFetchMode: action.payload.buttonFetchMode,
      };

    case ArticleActionTypes.SET_EDIT_ARTICLE:
      return { ...state, editArticle: action.payload.editArticle };

    case ArticleActionTypes.SET_EDITOR_MODE:
      return { ...state, editorMode: action.payload.editorMode };

    case ArticleActionTypes.GET_USER_ARTICLES:
      return {
        ...state,
        ...action.payload.articles,
        articleFetchMode: action.payload.articleFetchMode,
      };

    case ArticleActionTypes.GET_FEED_ARTICLES:
      return {
        ...state,
        feedArticles: action.payload.feedArticles.articles,
        articleFetchMode: action.payload.articleFetchMode,
      };

    case ArticleActionTypes.GET_GLOBAL_ARTICLES:
      return {
        ...state,
        ...action.payload.articles,
        articleFetchMode: action.payload.articleFetchMode,
      };

    case ArticleActionTypes.GET_TAGS:
      return { ...state, ...action.payload.tags };

    case ArticleActionTypes.SET_FORM_FETCH_MODE:
      return { ...state, formFetchMode: action.payload.formFetchMode };

    case ArticleActionTypes.SET_BUTTON_FETCH_MODE:
      return { ...state, buttonFetchMode: action.payload.buttonFetchMode };

    case ArticleActionTypes.SET_ARTICLE_FETCH_MODE:
      return { ...state, articleFetchMode: action.payload.articleFetchMode };

    case ArticleActionTypes.FAVORITE_ARTICLE:
      return {
        ...state,
        ...action.payload.articles,
        buttonFetchMode: action.payload.buttonFetchMode,
      };

    case ArticleActionTypes.UNFAVORITE_ARTICLE:
      return {
        ...state,
        ...action.payload.articles,
        buttonFetchMode: action.payload.buttonFetchMode,
      };

    case ArticleActionTypes.ADD_COMMENT:
      return { ...state, ...action.payload.comments, formFetchMode: action.payload.formFetchMode };

    case ArticleActionTypes.DELETE_COMMENT:
      return {
        ...state,
        ...action.payload.comments,
        buttonFetchMode: action.payload.buttonFetchMode,
      };

    case ArticleActionTypes.GET_COMMENTS:
      return {
        ...state,
        ...action.payload.comments,
        articleFetchMode: action.payload.articleFetchMode,
      };

    case ArticleActionTypes.SET_NEW_ARTICLE:
      return { ...state, newArticle: action.payload.newArticle };

    default:
      return state;
  }
}
