import React, { FC, ReactElement, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../store/selectors';
import { getComments, setArticleFetchMode } from '../../../store/article/actions';
import { FETCH_MODE, IComment } from '../../../store/article/types';

import CommentCard from '../CommentCard/CommentCard';
import './CommentList.scss';

interface ICommentListProps {
  slug: string;
}

const CommentList: FC<ICommentListProps> = ({ slug }) => {
  // state from store
  const { comments, articleFetchMode } = useTypedSelector((state) => state.article);

  const dispatch = useDispatch();

  // loading article's comments
  useEffect(() => {
    if (slug) {
      dispatch(setArticleFetchMode(FETCH_MODE.FETCHING));
      dispatch(getComments(slug));
    }
  }, [slug]);

  // set fetch mode (NO_FETCH) if comments has been loaded
  useEffect(() => {
    if (articleFetchMode === FETCH_MODE.FETCHED) {
      setArticleFetchMode(FETCH_MODE.NO_FETCH);
    }
  }, [articleFetchMode]);

  // if comments are fetching return empty
  if (articleFetchMode === FETCH_MODE.FETCHING) {
    return <></>;
  }

  return (
    <div className="CommentList">
      {comments &&
        comments.map((item: IComment, i: number) => (
          <CommentCard
            key={i}
            text={item.body}
            username={item.author.username}
            date={item.createdAt}
            slug={slug}
            id={item.id}
          />
        ))}
    </div>
  );
};

export default CommentList;
