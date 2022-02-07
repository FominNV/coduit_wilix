import React, { FC, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { ARTICLE_LIST_MODE } from '../../../store/article/types';

import Container from '../../Container/Container';
import ArticleList from '../../Articles/ArticleList/ArticleList';
import PopularTag from '../../Tags/PopularTag/PopularTag';
import './Homepage.scss';
import { getTags } from '../../../store/article/actions';

const Homepage: FC = () => {
  // states from store
  const { user } = useTypedSelector((state) => state.user);
  const { tags } = useTypedSelector((state) => state.article);

  // article mod state
  const [articleMode, setArticleMode] = useState<ARTICLE_LIST_MODE>(
    ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE
  );

  const [tagList, setTagList] = useState<string[]>();
  const [tagName, setTagName] = useState<string | undefined>();

  const dispatch = useDispatch();

  // get popular tags
  useEffect(() => {
    dispatch(getTags());
  }, []);

  // save popular tags to state
  useEffect(() => {
    if (tags) {
      setTagList(tags);
    }
  }, [tags]);

  // show article, filtered on tag
  const getArticlesByTag = (
    tag: string,
    e?: React.MouseEventHandler<HTMLParagraphElement>
  ): void => {
    setTagName(tag);
    setArticleMode(ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE);
  };

  return (
    <div className="Homepage">
      {/* show/hide this block: authorised or not */}
      {!user && (
        <div className="Homepage-banner">
          <Container>
            <h1 className="Homepage-banner__title">conduit</h1>
            <p className="Homepage-banner__text">
              A place to share your
              <span className="Homepage-banner__text_react">
                {}React{}
              </span>
              knowledge.
            </p>
          </Container>
        </div>
      )}

      <Container>
        <div className="Homepage-row">
          <div className="Homepage-content">
            {/* feed articles block */}
            <nav className="Homepage-content__navbar">
              <NavLink
                className={
                  articleMode === ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE
                    ? 'Homepage-content__navbar_link-active'
                    : 'Homepage-content__navbar_link'
                }
                to={'/'}
                onClick={() => setArticleMode(ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE)}
              >
                Your Feed
              </NavLink>

              {/* global articles block */}
              <NavLink
                className={
                  articleMode === ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE
                    ? 'Homepage-content__navbar_link-active'
                    : 'Homepage-content__navbar_link'
                }
                to={'/'}
                onClick={() => setArticleMode(ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE)}
              >
                Global Feed
              </NavLink>

              {/* tag articles block */}
              <div
                className={
                  articleMode === ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE
                    ? 'Homepage-content__navbar_tagLink-active'
                    : 'Homepage-content__navbar_tagLink'
                }
              >
                <i _ngcontent-c0="" className="ion-pound">
                  &nbsp;
                </i>
                {tagName}
              </div>
            </nav>

            {/* show feed/global/tag articles by activated mode */}
            {articleMode === ARTICLE_LIST_MODE.HOMEPAGE_FEED_MODE && (
              <ArticleList mode={articleMode} />
            )}
            {articleMode === ARTICLE_LIST_MODE.HOMEPAGE_GLOBAL_MODE && (
              <ArticleList mode={articleMode} />
            )}
            {articleMode === ARTICLE_LIST_MODE.HOMEPAGE_TAG_MODE && (
              <ArticleList mode={articleMode} tag={tagName} />
            )}
          </div>

          {/* popular tags block */}
          <div className="Homepage-sidebar">
            <div className="Homepage-sidebar__block">
              <div className="Homepage-sidebar__logo">Popular Tags</div>
              <div className="Homepage-sidebar__tagList">
                {tagList &&
                  tagList.map((elem: string, i: number) => {
                    if (i > 10) return;
                    return <PopularTag tag={elem} key={i} getArticlesByTag={getArticlesByTag} />;
                  })}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Homepage;
