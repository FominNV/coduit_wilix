import React, { FC } from 'react';
import './PopularTag.scss';

interface IPopularTagProps {
  tag: string;
  getArticlesByTag: (tag: string) => void;
}

const PopularTag: FC<IPopularTagProps> = ({ tag, getArticlesByTag }) => {
  return (
    <>
      <p className="PopularTag" onClick={() => getArticlesByTag(tag)}>
        {tag}
      </p>
    </>
  );
};

export default PopularTag;
