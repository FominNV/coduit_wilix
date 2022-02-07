import React, { FC, ReactElement, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import {
  favoriteArticle,
  setButtonFetchMode,
  unfavoriteArticle,
} from '../../../store/article/actions';
import { FETCH_MODE, FAVORITE_BTN_MODE, IArticle } from '../../../store/article/types';

import './FavoriteArticleBtn.scss';

interface IFavoriteArticleBtnProps {
  article: IArticle;
  mode: FAVORITE_BTN_MODE;
}

const FavoriteArticleBtn: FC<IFavoriteArticleBtnProps> = ({ article, mode }) => {
  // states from store
  const { buttonFetchMode } = useTypedSelector((state) => state.article);
  const { user } = useTypedSelector((state) => state.user);

  // button states
  const [text, setText] = useState<string>();
  const [favorite, setFavorite] = useState<boolean>();

  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  // set article favorited or unfavorited
  const favoriteHandler = (e: React.MouseEvent<HTMLButtonElement>): NavigateFunction | void => {
    if (!user) {
      return navigate('/login');
    }
    dispatch(setButtonFetchMode(FETCH_MODE.FETCHING));
    article!.favorited
      ? dispatch(unfavoriteArticle(article.slug))
      : dispatch(favoriteArticle(article.slug));
  };

  // check article: favorited or not
  useEffect(() => {
    if (article) {
      setFavorite(article.favorited);
    }
  }, [article]);

  // change text button depending on the favorited and set count of favorites users
  useEffect(() => {
    if (mode === FAVORITE_BTN_MODE.ARTICLE_MODE) {
      favorite
        ? setText(` Unfavorite Article (${article.favoritesCount})`)
        : setText(` Favorite Article (${article.favoritesCount})`);
    }
    if (mode === FAVORITE_BTN_MODE.CARD_MODE) {
      setText(` (${article.favoritesCount})`);
    }
  }, [mode, favorite]);

  return (
    <button
      className={favorite ? 'FavoriteArticleBtn favorited' : 'FavoriteArticleBtn'}
      disabled={buttonFetchMode == FETCH_MODE.FETCHING ? true : false}
      onClick={favoriteHandler}
    >
      <i className="ion-heart"></i>
      {text}
    </button>
  );
};

export default FavoriteArticleBtn;
