import React, { FC, ReactElement } from 'react';
import { dateFormat } from '../../../utils/common/common';
import './ArticleDate.scss';

interface IArticleDateProps {
  date: string;
}

const ArticleDate: FC<IArticleDateProps> = ({ date }) => {
  return <div className="ArticleDate">{dateFormat(date)}</div>;
};

export default ArticleDate;
