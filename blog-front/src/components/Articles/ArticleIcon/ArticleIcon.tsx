import React, { FC, ReactElement } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { URLS } from '../../../utils/urls/urls';
import './ArticleIcon.scss';

interface IArticleIconProps {
  username: string;
  size?: string;
}

const ArticleIcon: FC<IArticleIconProps> = ({ username, size }) => {
  const navigate: NavigateFunction = useNavigate();

  return (
    <img
      src={URLS.DEFAULT_LOGO}
      className={`ArticleIcon ${size}`}
      onClick={() => navigate(`/profile/${username}`)}
    />
  );
};

export default ArticleIcon;
