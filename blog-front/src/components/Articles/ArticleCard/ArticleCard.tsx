import React, { FC, ReactElement } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { FAVORITE_BTN_MODE, IArticle } from '../../../store/article/types';

import FavoriteArticleBtn from '../../Buttons/FavoriteArticleBtn/FavoriteArticleBtn';
import CardTag from '../../Tags/CardTag/CardTag';
import ArticleDate from '../ArticleDate/ArticleDate';
import ArticleIcon from '../ArticleIcon/ArticleIcon';
import ArticleUsername from '../ArticleUsername/ArticleUsername';

import './ArticleCard.scss';

interface IArticleCardProps {
  article: IArticle;
}

const ArticleCard: FC<IArticleCardProps> = ({ article }) => {
  const navigate: NavigateFunction = useNavigate();

  // redirect to article on click
  const linkToArticle = (e: React.MouseEvent<HTMLDivElement>): void => {
    navigate(`/article/${article.title}`);
  };

  // if no article return empty
  if (!article) return <></>;

  return (
    <div className="ArticleCard">
      {/* ----- Article banner start ------ */}
      <div className="ArticleCard-top">
        <div className="ArticleCard-top__userBlock">
          <ArticleIcon username={article.author.username} />
          <div className="ArticleCard-top__props">
            <ArticleUsername username={article.author.username} />
            <div className="ArticleCard-top__props_date">
              {<ArticleDate date={article.createdAt} />}
            </div>
          </div>
        </div>
        <FavoriteArticleBtn article={article} mode={FAVORITE_BTN_MODE.CARD_MODE} />
      </div>
      <h1 className="ArticleCard-title" onClick={linkToArticle}>
        {article.title}
      </h1>
      {/* ----- Article banner end ------ */}
      {/* ----- Article content start ------ */}
      <p className="ArticleCard-description" onClick={linkToArticle}>
        {article.description}
      </p>
      <div className="ArticleCard-bottom">
        <div className="ArticleCard-bottom__read" onClick={linkToArticle}>
          Read more...
        </div>
        {/* ----- Article content end ------ */}
        {/* ----- Article tags start ------ */}
        <div className="ArticleCard-bottom__tag-list" onClick={linkToArticle}>
          {article.tagList.map((elem: string, i: number) => (
            <CardTag key={i} tag={elem} />
          ))}
        </div>
        {/* ----- Article tags end ------ */}
      </div>
    </div>
  );
};

const compareArticleData = (prevProps: any, nextProps: any) => {
  return prevProps === nextProps;
};

export default React.memo(ArticleCard);
