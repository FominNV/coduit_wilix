import React, { FC, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ARTICLE_LIST_MODE } from '../../../../store/article/types';

import ArticleList from '../../../Articles/ArticleList/ArticleList';
import './ProfileContent.scss';

interface IProfileContentProps {
  username: string;
}

const ProfileContent: FC<IProfileContentProps> = ({ username }) => {
  // article's list mode state
  const [profileMode, setProfileMode] = useState<ARTICLE_LIST_MODE>(
    ARTICLE_LIST_MODE.PROFILE_MY_POSTS
  );

  return (
    <div className="ProfileContent">
      <div className="ProfileContent-content">
        <nav className="ProfileContent-navbar">
          {/* user articles block */}
          <NavLink
            className={
              profileMode === ARTICLE_LIST_MODE.PROFILE_MY_POSTS
                ? 'ProfileContent-navbar__link-active'
                : 'ProfileContent-navbar__link'
            }
            to={`/profile/${username}`}
            onClick={() => setProfileMode(ARTICLE_LIST_MODE.PROFILE_MY_POSTS)}
          >
            My Posts
          </NavLink>

          {/* favorited articles block */}
          <NavLink
            className={
              profileMode === ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS
                ? 'ProfileContent-navbar__link-active'
                : 'ProfileContent-navbar__link'
            }
            to={`/profile/${username}`}
            onClick={() => setProfileMode(ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS)}
          >
            Favorited Posts
          </NavLink>
        </nav>

        {/* show user/favorited articles by activated mode */}
        {profileMode === ARTICLE_LIST_MODE.PROFILE_MY_POSTS && (
          <ArticleList mode={profileMode} username={username} />
        )}
        {profileMode === ARTICLE_LIST_MODE.PROFILE_FAVORITED_POSTS && (
          <ArticleList mode={profileMode} />
        )}
      </div>
    </div>
  );
};

export default ProfileContent;
