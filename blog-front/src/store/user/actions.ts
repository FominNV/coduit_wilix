import { Dispatch } from 'redux';
import { UserAction, UserActionTypes } from './types';
import { getUrl, URLS } from '../../utils/urls/urls';
import { deleteCookie, getToken, parseError, setCookie } from '../../utils/common/common';
import { IOptions } from '../../utils/types/types';

export const setUser = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    let result: any;
    // формируем объект для тела запроса
    const user = {
      user: {
        email: email,
        password: password,
      },
    };
    try {
      dispatch({ type: UserActionTypes.LOADING_USER });

      result = await doRequest(user, 'POST', URLS.LOGIN_USER, false);

      // если мы ввели неправильные данные...
      if (result.status === 422) {
        throw new Error();
      }

      // сохраняем токен в куках для аутентификации пользователя
      setCookie('jwtToken', result.user.token);

      dispatch({ type: UserActionTypes.SET_USER, payload: result.user });
    } catch (e) {
      dispatch({
        type: UserActionTypes.ERROR_USER,
        payload: { status: result.status, text: parseError(result) },
      });
    }
  };
};

export const registerUser = (username: string, email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    let result: any;
    const user = {
      user: {
        username,
        email,
        password,
      },
    };
    try {
      dispatch({ type: UserActionTypes.LOADING_USER });

      result = await doRequest(user, 'POST', URLS.REGISTER_USER, false);

      // если мы ввели неправильные данные...
      if (result.status === 422) {
        throw new Error();
      }

      // сохраняем токен в куках для аутентификации пользователя
      setCookie('jwtToken', result.user.token);

      dispatch({ type: UserActionTypes.SET_USER, payload: result.user });
    } catch (e) {
      dispatch({
        type: UserActionTypes.ERROR_USER,
        payload: { status: result.status, text: parseError(result) },
      });
    }
  };
};

export const authUser = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    let result: any;
    try {
      result = await doRequest('', 'GET', URLS.AUTH_USER, true);

      // если мы ввели неправильные данные...
      if (result.status === 422) {
        throw new Error();
      }

      // сохраняем токен в куках для аутентификации пользователя
      setCookie('jwtToken', result.user.token);

      dispatch({ type: UserActionTypes.SET_USER, payload: result.user });
    } catch (e) {
      console.log(e);
    }
  };
};

export const clearUser = () => {
  // очищаем куки перед разлогированием!
  deleteCookie();
  // document.cookie = 'jwtToken' + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
  return { type: UserActionTypes.CLEAR_USER };
};

export const updateUser = (
  image: string,
  username: string,
  bio: string,
  email: string,
  password: string
) => {
  return async (dispatch: Dispatch<UserAction>) => {
    let result: any;
    // формируем объект для тела запроса
    const user = {
      user: {
        username,
        bio,
        image,
        email,
        password,
      },
    };
    try {
      dispatch({ type: UserActionTypes.LOADING_USER });

      result = await doRequest(user, 'PUT', URLS.UPDATE_USER, true);

      // если мы ввели неправильные данные...
      if (result.status === 422) {
        throw new Error();
      }

      // сохраняем токен в куках для аутентификации пользователя
      setCookie('jwtToken', result.user.token);

      dispatch({ type: UserActionTypes.SET_USER, payload: result.user });
    } catch (e) {
      dispatch({
        type: UserActionTypes.ERROR_USER,
        payload: { status: result.status, text: parseError(result) },
      });
    }
  };
};

async function doRequest<T>(data: T, method: string, url: string, auth: boolean) {
  const options: IOptions = {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  if (auth) {
    options.headers.Authorization = `Token ${getToken()}`;
  }

  const response = await fetch(getUrl(url), options);

  return await response.json();
}
