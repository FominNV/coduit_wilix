import React, { FC } from 'react';
import './CardTag.scss';

interface ICardTag {
  tag: string;
}

const CardTag: FC<ICardTag> = ({ tag }) => {
  return <div className="CardTag">{tag}</div>;
};

export default CardTag;
