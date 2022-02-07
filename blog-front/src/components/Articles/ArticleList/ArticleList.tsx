import React, { FC, ReactElement, useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import {
  getFeedArticles,
  getGlobalArticles,
  getUserArticles,
  setArticleFetchMode,
} from '../../../store/article/actions';
import { ARTICLE_LIST_MODE, FETCH_MODE, IArticle } from '../../../store/article/types';

import ArticleCard from '../ArticleCard/ArticleCard';
import './ArticleList.scss';

interface IArticleListProps {
  mode: ARTICLE_LIST_MODE;
  tag?: string;
  username?: string;
}

const ArticleList: FC<IArticleListProps> = ({ mode, tag, username }): ReactElement => {
  // states from store
  const { user } = useTypedSelector((state) => state.user);
  const { articles, feedArticles, articleFetchMode } = useTypedSelector((state) => state.article);

  // loaded articles
  const [currentArticles, setCurrentArticles] = useState<IArticle[]>([]);

  const navigate: NavigateFunction = useNavigate();
  const dispatch = useDispatch();

  // check mode and fetch needable articles
  useEffect(() => {
    if (mode === ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE) {
      if (!user) {
        navigate('/login');
      }
      dispatch(setArticleFetchMode(FETCH_MODE.FETCHING));
      dispatch(getFeedArticles());
    }
    if (mode === ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE) {
      dispatch(setArticleFetchMode(FETCH_MODE.FETCHING));
      dispatch(getGlobalArticles());
    }
    if (mode === ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE) {
      dispatch(setArticleFetchMode(FETCH_MODE.FETCHING));
      dispatch(getGlobalArticles());
    }
    if (mode === ARTICLE_LIST_MODE.PROFILE_MY_POSTS) {
      dispatch(setArticleFetchMode(FETCH_MODE.FETCHING));
      dispatch(getUserArticles(username!));
    }
    if (mode === ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS) {
      dispatch(setArticleFetchMode(FETCH_MODE.FETCHING));
      dispatch(getGlobalArticles());
    }
  }, []);

  // set article fetch mode (NO_FETCH) if fetching had finished
  useEffect(() => {
    if (articleFetchMode === FETCH_MODE.FETCHED) {
      dispatch(setArticleFetchMode(FETCH_MODE.NO_FETCH));
    }
  }, [articleFetchMode]);

  // save feed articles in the state
  useEffect(() => {
    if (feedArticles && mode === ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE) {
      setCurrentArticles(feedArticles);
    }
  }, [feedArticles]);

  // save global or user articles in the state
  useEffect(() => {
    if (
      (articles && mode === ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE) ||
      (articles && mode === ARTICLE_LIST_MODE.PROFILE_MY_POSTS)
    ) {
      setCurrentArticles(articles);
    }
  }, [articles]);

  // save articles, filtered by tag
  useEffect(() => {
    if (tag && mode === ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE) {
      const filtredArticles = articles!.filter((elem: any) => elem.tagList.includes(tag));
      setCurrentArticles(filtredArticles);
    }
  }, [tag]);

  // save articles, filtered by favorited
  useEffect(() => {
    if (user && mode === ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS) {
      const filtredArticles = articles!.filter((elem: IArticle) => elem.favorited);
      setCurrentArticles(filtredArticles);
    }
  }, [mode, articles]);

  // render loaded articles
  const showArticles = () =>
    currentArticles.map((elem: IArticle, i: number) => {
      return <ArticleCard key={i} article={elem} />;
    });

  // return loading if fetching
  if (articleFetchMode === FETCH_MODE.FETCHING)
    return (
      <div className="ArticleList">
        <p className="ArticleList-text">Loading Articles...</p>
      </div>
    );

  return (
    <>
      {currentArticles && currentArticles.length > 0 ? (
        <div className="ArticleList">{showArticles()}</div>
      ) : (
        <p className="ArticleList-text">No articles are here... yet.</p>
      )}
    </>
  );
};

export default ArticleList;
