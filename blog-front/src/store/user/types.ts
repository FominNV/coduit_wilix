export interface IUser {
  username: string;
  email: string;
  token: string;
  bio: string;
  image: string;
}

export interface IUserError {
  status: number;
  text: string[];
}

export interface IUserState {
  user: IUser | null;
  loading: boolean;
  error: IUserError | null;
}

export enum UserActionTypes {
  SET_USER = 'SET_USER',
  CLEAR_USER = 'CLEAR_USER',
  LOADING_USER = 'LOADING_USER',
  ERROR_USER = 'ERROR_USER',
  REGISTER_USER = 'REGISTER_USER',
  AUTH_USER = 'AUTH_USER',
}

export type SetUserAction = {
  type: UserActionTypes.SET_USER;
  payload: IUser;
};

export type ClearUserAction = {
  type: UserActionTypes.CLEAR_USER;
};

export type LoadingUserAction = {
  type: UserActionTypes.LOADING_USER;
};

export type ErrorUserAction = {
  type: UserActionTypes.ERROR_USER;
  payload: IUserError;
};

export type RegisterUserAction = {
  type: UserActionTypes.REGISTER_USER;
};

export type AuthUserAction = {
  type: UserActionTypes.AUTH_USER;
};

export type UserAction =
  | SetUserAction
  | ClearUserAction
  | LoadingUserAction
  | ErrorUserAction
  | RegisterUserAction
  | AuthUserAction;
