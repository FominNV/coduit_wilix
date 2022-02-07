import React, { FC, ReactElement } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import './ArticleUsername.scss';

interface IArticleUsernameProps {
  username: string | undefined;
  color?: string | undefined;
  size?: string | undefined;
}

const ArticleUsername: FC<IArticleUsernameProps> = ({ username, color, size }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <div
      className={`ArticleUsername ${color} ${size}`}
      onClick={() => navigate(`/profile/${username}`)} // redirect to user profile
    >
      {username}
    </div>
  );
};

export default ArticleUsername;
