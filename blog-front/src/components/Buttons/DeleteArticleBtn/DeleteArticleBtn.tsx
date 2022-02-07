import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import {
  removeArticle,
  setButtonFetchMode,
  setFormFetchMode,
} from '../../../store/article/actions';
import { FETCH_MODE } from '../../../store/article/types';

import './DeleteArticleBtn.scss';

interface IDeleteArticleBtnProps {
  slug: string;
}

const DeleteArticleBtn: FC<IDeleteArticleBtnProps> = ({ slug }) => {
  // state from store
  const { buttonFetchMode } = useTypedSelector((state) => state.article);
  const dispatch = useDispatch();

  // delete article and redirect to home page
  const deleteArticle = () => {
    dispatch(setFormFetchMode(FETCH_MODE.FETCHING));
    dispatch(setButtonFetchMode(FETCH_MODE.FETCHING));
    dispatch(removeArticle(slug!));
  };

  return (
    <button
      className="DeleteArticleBtn"
      onClick={deleteArticle}
      disabled={buttonFetchMode === FETCH_MODE.FETCHING ? true : false}
    >
      <i className="ion-trash-a"></i>&nbsp;Delete Article
    </button>
  );
};

export default DeleteArticleBtn;
