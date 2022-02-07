import React, { FC, ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { setEditArticle, setEditorMode } from '../../../store/article/actions';
import { EDITOR_MODE, IArticle } from '../../../store/article/types';

import './EditArticleBtn.scss';

interface IEditArticleBtnPpops {
  article: IArticle;
}

const EditArticleBtn: FC<IEditArticleBtnPpops> = ({ article }) => {
  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  // set edition mpde and redirect to editor page
  const changeArticle = (e: React.MouseEvent<HTMLButtonElement>): void => {
    dispatch(setEditArticle(article!));
    dispatch(setEditorMode(EDITOR_MODE.EDIT_MODE));
    navigate(`/editor`);
  };

  return (
    <button className="EditArticleBtn" onClick={changeArticle}>
      <i className="ion-edit"></i>&nbsp;Edit Article
    </button>
  );
};

export default EditArticleBtn;
