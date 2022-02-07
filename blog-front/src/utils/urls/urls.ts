export enum URLS {
  SERVER_URL = 'http://localhost:3003',
  DEFAULT_LOGO = 'https://static.productionready.io/images/smiley-cyrus.jpg',
  REGISTER_USER = '/api/users',
  LOGIN_USER = '/api/users/login',
  AUTH_USER = '/api/user',
  UPDATE_USER = '/api/user',
  CREATE_ARTICLE = '/api/articles',
  GET_USER = '/api/profiles',
}

export const getUrl = (url: string): string => {
  return URLS.SERVER_URL + url;
};
