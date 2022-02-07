import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { userReducer } from './user/reducer';
import { articleReducer } from './article/reducer';

export type RootState = ReturnType<typeof combinedReducer>;

const combinedReducer = combineReducers({
  user: userReducer,
  article: articleReducer,
});

const composeEnhancers = composeWithDevTools({});

export const store = createStore(combinedReducer, {}, composeEnhancers(applyMiddleware(thunk)));
