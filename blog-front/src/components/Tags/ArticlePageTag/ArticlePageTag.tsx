import React, { FC } from 'react';
import './ArticlePageTag.scss';

interface IArticlePageTag {
  tag: string;
}

const ArticlePageTag: FC<IArticlePageTag> = ({ tag }) => {
  return <div className="ArticlePageTag">{tag}</div>;
};

export default ArticlePageTag;
