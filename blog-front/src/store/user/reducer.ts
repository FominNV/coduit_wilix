import { IUserState, UserAction, UserActionTypes } from './types';
import { URLS } from '../../utils/urls/urls';

const initialState: IUserState = {
  user: null,
  loading: false,
  error: null,
};

export function userReducer(state: IUserState = initialState, action: UserAction): IUserState {
  switch (action.type) {
    case UserActionTypes.SET_USER: {
      return {
        ...state,
        loading: false,
        user: {
          email: action.payload.email,
          token: action.payload.token,
          username: action.payload.username,
          bio: action.payload.bio,
          image: action.payload.image || URLS.DEFAULT_LOGO,
        },
      };
    }
    case UserActionTypes.CLEAR_USER: {
      return initialState;
    }
    case UserActionTypes.LOADING_USER: {
      return { ...state, loading: true, error: null };
    }
    case UserActionTypes.ERROR_USER: {
      return {
        ...state,
        loading: false,
        error: {
          status: action.payload.status,
          text: action.payload.text,
        },
      };
    }
    case UserActionTypes.REGISTER_USER: {
      return {
        ...state,
        loading: false,
      };
    }
    default: {
      return state;
    }
  }
}
