import React, { FC, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { getGlobalArticles, setFormFetchMode, setNewArticle } from '../../../store/article/actions';
import { FETCH_MODE } from '../../../store/article/types';

import Container from '../../Container/Container';
import EditorForm from '../../Forms/EditorForm/EditorForm';

import './Editor.scss';

const Editor: FC = () => {
  // states from store
  const { newArticle, formFetchMode } = useTypedSelector((state) => state.article);

  const dispatch = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  // load articles
  useEffect(() => {
    dispatch(getGlobalArticles());
  }, []);

  // redirect to article page
  useEffect(() => {
    if (formFetchMode === FETCH_MODE.FETCHED && newArticle.title) {
      dispatch(setFormFetchMode(FETCH_MODE.NO_FETCH));
      dispatch(setNewArticle(''));
      navigate(`/article/${newArticle.title}`);
    }
  }, [formFetchMode]);

  return (
    <div className="Editor">
      <Container>
        <div className="Editor-row">
          <EditorForm />
        </div>
      </Container>
    </div>
  );
};

export default Editor;
